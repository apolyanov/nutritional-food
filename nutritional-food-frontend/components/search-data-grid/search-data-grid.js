'use client';
import { Button, Card, Flex, Input, Table } from 'antd';
import { columns } from '@/components/common/columns';
import { useCallback, useMemo } from 'react';
import api from '@/axios/axios.config';
import { SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';
import useFoodData from '@/lib/useFoodData';
import { useRouter } from 'next/navigation';

const SearchDataGrid = () => {
  const { searchGridData, setSearchGridData } = useFoodData();
  const router = useRouter();

  const handleOnSearch = (event) => {
    debounceInput(event);
  };

  const getSearchedFood = useCallback(
    (query) => {
      if (query.trim() === '') {
        setSearchGridData([]);
      } else {
        api.get(`/food/search?description=${query}`).then((response) => setSearchGridData(response.data.data));
      }
    },
    [setSearchGridData],
  );

  const onInputCallback = useCallback((event) => getSearchedFood(event.target.value), [getSearchedFood]);

  const debounceInput = useMemo(() => debounce((event) => onInputCallback(event), 300), [onInputCallback]);

  const memoizedColumns = useMemo(() => columns(false), []);

  return (
    <Card style={{ width: '70%' }} bordered={false}>
      <Flex gap={16} vertical>
        <Flex gap={16}>
          <Input
            addonAfter={<SearchOutlined />}
            onChange={handleOnSearch}
            placeholder='Search for food'
            allowClear
            style={{ width: 200, marginRight: 'auto' }}
          />
          <Button onClick={() => router.push('/food')}>Add new food</Button>
        </Flex>
        <Table rowKey={'id'} style={{ width: '100%' }} columns={memoizedColumns} dataSource={searchGridData} />
      </Flex>
    </Card>
  );
};

export default SearchDataGrid;
