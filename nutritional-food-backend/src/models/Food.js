import { sequelize } from '../db.config.js';
import { DataTypes } from 'sequelize';

const Food = () =>
  sequelize.define(
    'Food',
    {
      description: {
        type: DataTypes.TEXT,
      },
      kcal: {
        type: DataTypes.FLOAT,
      },
      protein: {
        type: DataTypes.FLOAT,
      },
      carbs: {
        type: DataTypes.FLOAT,
      },
      fats: {
        type: DataTypes.FLOAT,
      },
    },
    {
      tableName: 'food',
    },
  );

export { Food };
