import { getModels } from '../db.config.js';

const getAllFood = async () => await getModels().Food.findAll();

const getFoodById = async (id) => await getModels().Food.findByPk(id);

const addFood = async (food) => await getModels().Food.create(food, { returning: true });

const deleteFood = async (id) =>
  await getModels().Food.destroy({
    where: {
      id,
    },
  });

const searchForFood = async (query) => {
  const allFood = await getAllFood();

  return allFood.filter((food) => food.description.toLowerCase().includes(query.toLowerCase()));
};

const putFood = async (food, id) => {
  return await getModels().Food.update(food, { where: { id }, returning: true });
};

export { getAllFood, getFoodById, addFood, deleteFood, searchForFood, putFood };
