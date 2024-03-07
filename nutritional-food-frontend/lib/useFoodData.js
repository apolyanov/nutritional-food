import { useContext } from 'react';
import { FoodDataProviderContext } from '@/lib/food-data-provider';

const useFoodData = () => useContext(FoodDataProviderContext);

export default useFoodData;
