import { useCallback, useState } from 'react';
import api from '@/axios/axios.config';

const useServerTable = ({ setSearchGridData }) => {
  const [loadingFood, setLoadingFood] = useState(false);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: 0,
    pageCount: 1,
  });
  const [sorting, setSorting] = useState([]);

  const getPaginationOffset = (pagination) => {
    if (pagination.pageIndex === 0) {
      return 0;
    }
    if (pagination.pageIndex > 0) {
      return Number(pagination?.pageIndex ?? 0) * pagination.pageSize;
    }
  };

  const getPaginationParams = useCallback((pagination) => {
    if (pagination) {
      return `&offset=${getPaginationOffset(pagination)}&limit=${pagination.pageSize}`;
    }
    return '';
  }, []);

  const getSortingParams = useCallback((sorting) => {
    if (sorting.length > 0) {
      return `&column=${sorting[0].id}&direction=${sorting[0].desc ? 'DESC' : 'ASC'}`;
    }

    return '';
  }, []);

  const getSearchedFood = useCallback(
    (query, pagination, sorting) => {
      if (query.trim() === '') {
        setSearchGridData([]);
        setPagination((prevState) => ({
          ...prevState,
          pageCount: 1,
          pageIndex: 0,
        }));
      } else {
        setLoadingFood(true);
        api
          .get(`/food/search?search=${query}${getPaginationParams(pagination)}${getSortingParams(sorting)}`)
          .then((response) => {
            setSearchGridData(response.data.data.page);
            setPagination((prevState) => ({
              ...prevState,
              pageCount: response.data.data.total,
            }));
          })
          .finally(() => setLoadingFood(false));
      }
    },
    [getPaginationParams, getSortingParams],
  );

  return { getSearchedFood, pagination, setPagination, setSorting, sorting, loadingFood, setLoadingFood };
};

export default useServerTable;
