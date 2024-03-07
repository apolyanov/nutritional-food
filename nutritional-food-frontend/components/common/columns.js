import Actions from '@/components/common/actions';

const columns = (isInTotalsGrid) => [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'KCal',
    dataIndex: 'kcal',
    key: 'kcal',
  },
  {
    title: 'Protein',
    dataIndex: 'protein',
    key: 'protein',
  },
  {
    title: 'Carbs',
    dataIndex: 'carbs',
    key: 'carbs',
  },
  {
    title: 'Fats',
    dataIndex: 'fats',
    key: 'fats',
  },
  {
    title: 'Added at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (checked, record) => new Date(record.createdAt).toLocaleString(),
  },
  {
    title: 'Updated at',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (checked, record) => new Date(record.updatedAt).toLocaleString(),
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (checked, record) => <Actions record={record} isInTotalsGrid={isInTotalsGrid} />,
  },
];

export { columns };
