'use client';
import useFoodData from '@/lib/useFoodData';
import { useMemo, useState } from 'react';
import { columns } from '@/components/common/columns';
import { Button, Container, ImpulseTable } from '@impulse-ui/toolkit';

const TotalsDataGrid = () => {
  const { totalGridData, setTotalGridData } = useFoodData();
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: 0,
  });

  const memoizedColumns = useMemo(() => columns({ isInTotalsGrid: true }), []);
  const pageCount =
    Math.ceil(totalGridData.length / pagination.pageSize) > 0
      ? Math.ceil(totalGridData.length / pagination.pageSize)
      : 1;

  return (
    <Container
      iStyle={{
        iCss: {
          width: '70%',
          background: 'white',
          padding: 16,
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}
    >
      <Button onClick={() => setTotalGridData([])}>Clear data</Button>
      <ImpulseTable
        state={{
          pagination,
        }}
        onPaginationChange={setPagination}
        pageCount={pageCount}
        initialState={{ pagination: { pageIndex: 0, pageSize: 10 } }}
        columns={memoizedColumns}
        data={totalGridData}
      />
    </Container>
  );
};

export default TotalsDataGrid;
