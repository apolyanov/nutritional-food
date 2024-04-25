'use client';
import { columns } from '@/components/common/columns';
import { useCallback, useMemo } from 'react';
import useFoodData from '@/lib/useFoodData';
import { useRouter } from 'next/navigation';
import { Container, ImpulseTable, TextInput, Button } from '@impulse-ui/toolkit';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchDataGrid = () => {
  const {
    searchGridData,
    search,
    setSearch,
    getSearchedFood,
    pagination,
    setPagination,
    setSorting,
    sorting,
    loadingFood,
  } = useFoodData();

  const onSearchCallback = useCallback(
    (event) => {
      getSearchedFood(event.target.value, pagination, sorting);
    },
    [getSearchedFood, pagination, sorting],
  );

  const router = useRouter();

  const memoizedColumns = useMemo(() => columns({}), []);

  return (
    <Container iStyle={{ iCss: { width: '70%', background: 'white', padding: 16, borderRadius: 8 } }}>
      <Container iStyle={{ iCss: { display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' } }}>
        <Container iStyle={{ iCss: { display: 'flex', gap: 16 } }}>
          <TextInput
            value={search}
            icon={faSearch}
            debounced
            onChange={(event) => setSearch(event.target.value)}
            onDebouncedChange={onSearchCallback}
            placeholder='Search for food'
            style={{ width: 200, marginRight: 'auto' }}
          />
          <Button onClick={() => router.push('/food')}>Add food</Button>
        </Container>
        <ImpulseTable
          iStyle={{
            tbodyStyle: {
              noContentTbodyStyle: { iCss: { opacity: loadingFood ? 0.2 : 1 } },
              tbodyStyle: { iCss: { opacity: loadingFood ? 0.2 : 1 } },
            },
          }}
          state={{
            pagination,
            sorting,
          }}
          manualSorting
          manualPagination
          pageCount={Math.ceil(pagination.pageCount / pagination.pageSize)}
          onSortingChange={(updaterOrValue) => {
            const newSorting = updaterOrValue(sorting);
            getSearchedFood(search, pagination, newSorting);
            setSorting(newSorting);
          }}
          onColumnFiltersChange={(updaterOrValue) => console.log(updaterOrValue())}
          onPaginationChange={(updaterOrValue) => {
            const newPagination = updaterOrValue(pagination);
            getSearchedFood(search, newPagination, sorting);
            setPagination(newPagination);
          }}
          initialState={{ pagination: { pageIndex: 0, pageSize: 10 } }}
          data={searchGridData}
          columns={memoizedColumns}
        />
      </Container>
    </Container>
  );
};

export default SearchDataGrid;
