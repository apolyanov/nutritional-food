import { setupDatabase, setupSequelize } from '../db.config.js';
import { addAllFood } from '../services/foodService.js';
import { faker } from '@faker-js/faker';
import { FOOD_NAMES, FOOD_TYPES } from './foodTypes.js';

const createFood = () => ({
  description: `Tasty ${faker.helpers.arrayElement(FOOD_NAMES)} - ${faker.helpers.arrayElement(FOOD_TYPES)}`,
  kcal: faker.helpers.rangeToNumber({ min: 40, max: 560 }),
  protein: faker.helpers.rangeToNumber({ min: 4, max: 25 }),
  carbs: faker.helpers.rangeToNumber({ min: 6, max: 20 }),
  fats: faker.helpers.rangeToNumber({ min: 2, max: 14 }),
});

const generateData = () => faker.helpers.multiple(createFood, { count: 10_000 });

const insertData = async () => {
  await setupDatabase();
  await setupSequelize();

  await addAllFood(generateData());
};

insertData().then(() => console.log('Data was inserted!'));
