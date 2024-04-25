'use client';
import { useSearchParams } from 'next/navigation';
import { Button, Card, Flex, Form, Input, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import api from '@/axios/axios.config';
import { useRouter } from 'next/navigation';
import useFoodData from '@/lib/useFoodData';

const AddEditFood = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { updateFood, addToSearchGridData } = useFoodData();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: isInEditMode() ? 'Food saved successfully!' : 'Food created successfully!',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Something went wrong',
    });
  };

  const [initialValuesLoading, setInitialValuesLoading] = useState(true);
  const [initialValues, setInitialValues] = useState();

  const isInEditMode = useCallback(() => params.get('mode') === 'edit', [params]);

  useEffect(() => {
    if (isInEditMode()) {
      api.get(`/food/find/${params.get('id')}`).then((response) => {
        setInitialValues(response.data.data);
        setInitialValuesLoading(false);
      });
    } else {
      setInitialValuesLoading(false);
    }
  }, [isInEditMode, params]);

  const onFinish = async (values) => {
    if (isInEditMode()) {
      await api
        .put(`/food/update/${params.get('id')}`, { ...values })
        .then((response) => {
          updateFood({ ...response.data.data });
          success();
        })
        .catch(() => error());
    } else {
      await api
        .post('/food/add', { ...values })
        .then((response) => {
          addToSearchGridData({ ...response.data.data });
          form.resetFields();
          success();
        })
        .catch(() => error());
    }
  };

  if (initialValuesLoading) {
    return <Card>Loading...</Card>;
  }

  return (
    <Card bordered={false}>
      {contextHolder}
      <Form
        form={form}
        name='basic'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          label='Description'
          name='description'
          initialValue={initialValues?.description ?? ''}
          rules={[
            {
              required: true,
              message: 'Please input description!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='KCal'
          name='kcal'
          initialValue={initialValues?.kcal ?? ''}
          rules={[
            {
              required: true,
              message: 'Please input kcal!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Protein'
          name='protein'
          initialValue={initialValues?.protein ?? ''}
          rules={[
            {
              required: true,
              message: 'Please input protein!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Carbs'
          name='carbs'
          initialValue={initialValues?.carbs ?? ''}
          rules={[
            {
              required: true,
              message: 'Please input carbs!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Fats'
          name='fats'
          initialValue={initialValues?.fats ?? ''}
          rules={[
            {
              required: true,
              message: 'Please input fats!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Flex justify={'center'}>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type='primary' htmlType='submit'>
              {isInEditMode() ? 'Save' : 'Create'}
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type='primary' htmlType={'button'} onClick={() => router.push('/')}>
              Back home
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Card>
  );
};

export default AddEditFood;
