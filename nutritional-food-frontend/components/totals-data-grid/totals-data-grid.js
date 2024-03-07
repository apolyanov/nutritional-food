'use client';
import { Card, Flex, Input, Table, Typography } from 'antd';
import { columns } from '@/components/common/columns';
import { useEffect, useMemo } from 'react';
import api from '@/axios/axios.config';
import useFoodData from '@/lib/useFoodData';

const TotalsDataGrid = () => {
  const { totalGridData } = useFoodData();
  const memoizedColumns = useMemo(() => columns(true), []);

  return (
    <Card style={{ width: '70%' }} bordered={false}>
      <Table
        rowKey={'id'}
        style={{ width: '100%' }}
        columns={memoizedColumns}
        dataSource={totalGridData}
        summary={(pageData) => {
          let totalKcal = 0;
          let totalProtein = 0;
          let totalCarbs = 0;
          let totalFats = 0;

          pageData.forEach(({ kcal, protein, carbs, fats }) => {
            totalKcal += Number(kcal);
            totalProtein += Number(protein);
            totalCarbs += Number(carbs);
            totalFats += Number(fats);
          });

          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
              <Table.Summary.Cell index={1} />
              <Table.Summary.Cell index={2}>
                <Typography.Text>{totalKcal}</Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <Typography.Text>{totalProtein}</Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4}>
                <Typography.Text>{totalCarbs}</Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={5}>
                <Typography.Text>{totalFats}</Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={6} />
              <Table.Summary.Cell index={7} />
              <Table.Summary.Cell index={8} />
            </Table.Summary.Row>
          );
        }}
      />
    </Card>
  );
};

export default TotalsDataGrid;
