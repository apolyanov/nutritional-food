import { getModels } from '../db.config.js';
import { Op } from 'sequelize';

const getSortingArgs = (column, direction) => {
  if (column && direction) {
    return [[column, direction]];
  }

  return [];
};

const getAllFood = async () => await getModels().Food.findAll();

const getFoodById = async (id) => await getModels().Food.findByPk(id);

const addFood = async (food) => await getModels().Food.create(food, { returning: true });

const deleteFood = async (id) =>
  await getModels().Food.destroy({
    where: {
      id,
    },
  });

const searchForFood = async (search, offset, limit, column, direction) => {
  return await getModels().Food.findAndCountAll({
    where: {
      description: {
        [Op.iLike]: `%${search.toLowerCase()}%`,
      },
    },
    order: getSortingArgs(column, direction),
    offset: Number(offset),
    limit: Number(limit),
  });
};

const addAllFood = async (foods) => await getModels().Food.bulkCreate(foods);

const putFood = async (food, id) => {
  return await getModels().Food.update(food, { where: { id }, returning: true });
};

export { getAllFood, getFoodById, addFood, deleteFood, searchForFood, putFood, addAllFood };
