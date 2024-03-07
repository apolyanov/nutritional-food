import { setupDatabase, setupSequelize } from '../db.config.js';
import { addAllFood } from '../services/foodService.js';
import data from './generated_food_data.json' assert { type: 'json' };

const insertData = async () => {
  await setupDatabase();
  await setupSequelize();

  await addAllFood(data);
};

insertData().then(() => console.log('Data was inserted!'));
