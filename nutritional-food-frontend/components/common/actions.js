'use client';
import { Button, Flex, Popover } from 'antd';
import { useState } from 'react';
import useFoodData from '@/lib/useFoodData';
import api from '@/axios/axios.config';
import { useRouter } from 'next/navigation';

const Actions = ({ record, isInTotalsGrid }) => {
  const { addToTotalsGridData, isAddedInTotals, removeFromTotalsGridData, removeFromSearchGridData } = useFoodData();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleOnClickDelete = () => {
    api.delete(`/food/delete/${record.id}`).then(async () => {
      removeFromTotalsGridData(record.id);
      removeFromSearchGridData(record.id);
    });
  };

  const rowActions = () => (
    <Flex vertical gap={8}>
      {!isInTotalsGrid && (
        <Button disabled={isAddedInTotals(record.id)} onClick={() => addToTotalsGridData(record)}>
          Add to totals
        </Button>
      )}
      {isInTotalsGrid && <Button onClick={() => removeFromTotalsGridData(record.id)}>Remove from totals</Button>}
      <Button onClick={() => router.push(`/food?mode=edit&id=${record.id}`)}>Edit</Button>
      {!isInTotalsGrid && (
        <Button onClick={handleOnClickDelete} danger>
          Delete
        </Button>
      )}
    </Flex>
  );

  return (
    <Popover content={rowActions} placement={'right'} trigger='click' open={open} onOpenChange={handleOpenChange}>
      <Button type='primary'>Actions</Button>
    </Popover>
  );
};

export default Actions;
