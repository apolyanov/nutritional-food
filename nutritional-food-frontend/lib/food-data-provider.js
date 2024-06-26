'use client';
import { createContext, useState } from 'react';
import useServerTable from '@/lib/useServerTable';

const FoodDataProviderContext = createContext({});

const FoodDataProvider = ({ children }) => {
  const [totalGridData, setTotalGridData] = useState([]);
  const [searchGridData, setSearchGridData] = useState([]);
  const [search, setSearch] = useState('');
  const serverTable = useServerTable({ setSearchGridData });

  const addToTotalsGridData = (record) => {
    setTotalGridData((prevState) => [...prevState, record]);
  };

  const addToSearchGridData = (record) => {
    setSearchGridData((prevState) => [...prevState, record]);
  };

  const filterRecord = (prevState, id) => prevState.filter((record) => record.id !== id);

  const removeFromTotalsGridData = (id) => {
    setTotalGridData((prevState) => filterRecord(prevState, id));
  };

  const removeFromSearchGridData = (id) => {
    setSearchGridData((prevState) => filterRecord(prevState, id));
  };

  const updateFood = (newFood) => {
    const newTotalGridData = [...totalGridData];
    const newSearchGridData = [...searchGridData];

    const newTotalGridDataIndex = totalGridData.findIndex((record) => record.id === newFood.id);
    const newSearchGridDataIndex = newSearchGridData.findIndex((record) => record.id === newFood.id);

    if (newTotalGridDataIndex !== -1) newTotalGridData[newTotalGridDataIndex] = { ...newFood };

    if (newSearchGridDataIndex !== -1) newSearchGridData[newSearchGridDataIndex] = { ...newFood };

    setTotalGridData(newTotalGridData);
    setSearchGridData(newSearchGridData);
  };

  const isAddedInTotals = (id) => totalGridData.find((record) => record.id === id);

  const contextValue = {
    totalGridData,
    setTotalGridData,
    searchGridData,
    setSearchGridData,
    search,
    setSearch,
    ...serverTable,
    addToTotalsGridData,
    addToSearchGridData,
    removeFromTotalsGridData,
    removeFromSearchGridData,
    isAddedInTotals,
    updateFood,
  };

  return <FoodDataProviderContext.Provider value={contextValue}>{children}</FoodDataProviderContext.Provider>;
};

export default FoodDataProvider;
export { FoodDataProviderContext };
