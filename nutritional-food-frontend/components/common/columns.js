import Actions from '@/components/common/actions';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

const columns = ({ isInTotalsGrid }) => {
  const colDefs = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue(),
      header: 'Id',
      size: 20,
      ...(isInTotalsGrid
        ? {
            footer: () => 'Sum',
          }
        : undefined),
    }),
    columnHelper.accessor('description', {
      cell: (info) => <i>{info.getValue()}</i>,
      header: 'Description',
      size: 260,
    }),
    columnHelper.accessor('kcal', {
      header: 'KCal',
      cell: (info) => info.renderValue(),
      size: 10,
      ...(isInTotalsGrid
        ? {
            footer: ({ table }) =>
              table
                .getCoreRowModel()
                .rows.reduce((prevValue, currentValue) => prevValue + currentValue.original['kcal'], 0),
          }
        : undefined),
    }),
    columnHelper.accessor('protein', {
      header: 'Protein',
      size: 10,
      ...(isInTotalsGrid
        ? {
            footer: ({ table }) =>
              table
                .getCoreRowModel()
                .rows.reduce((prevValue, currentValue) => prevValue + currentValue.original['protein'], 0),
          }
        : undefined),
    }),
    columnHelper.accessor('carbs', {
      header: 'Carbs',
      size: 10,
      ...(isInTotalsGrid
        ? {
            footer: ({ table }) =>
              table
                .getCoreRowModel()
                .rows.reduce((prevValue, currentValue) => prevValue + currentValue.original['carbs'], 0),
          }
        : undefined),
    }),
    columnHelper.accessor('fats', {
      header: 'Fats',
      enableSorting: true,
      sortingFn: 'auto',
      size: 10,
      ...(isInTotalsGrid
        ? {
            footer: ({ table }) =>
              table
                .getCoreRowModel()
                .rows.reduce((prevValue, currentValue) => prevValue + currentValue.original['fats'], 0),
          }
        : undefined),
    }),
  ];

  if (!isInTotalsGrid) {
    colDefs.push(
      columnHelper.accessor('createdAt', {
        header: 'Created on',
        enableSorting: true,
        cell: (row) => new Date(row.getValue()).toLocaleString(),
        sortingFn: 'auto',
        size: 140,
      }),
      columnHelper.accessor('updatedAt', {
        header: 'Updated on',
        enableSorting: true,
        cell: (row) => new Date(row.getValue()).toLocaleString(),
        sortingFn: 'auto',
        size: 140,
      }),
    );
  }

  colDefs.push({
    header: 'Action',
    enableSorting: true,
    sortingFn: 'auto',
    size: 100,
    cell: ({ row }) => <Actions record={row.original} isInTotalsGrid={isInTotalsGrid} />,
  });

  return colDefs;
};

export { columns };
