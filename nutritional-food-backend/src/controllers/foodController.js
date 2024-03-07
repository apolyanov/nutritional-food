import express from 'express';
import { createResponse } from '../utils.js';
import { addFood, deleteFood, getAllFood, getFoodById, putFood, searchForFood } from '../services/foodService.js';

const foodController = express.Router();

foodController.get('/search', async (req, res) => {
  const description = req.query.description;

  if (description) {
    res.status(200).json(createResponse(await searchForFood(description)));
  } else {
    res.status(400).json(createResponse(null, 'Bad query parameter!'));
  }
});

foodController.get('/all', async (req, res) => {
  const foods = await getAllFood();

  res.status(200).json(createResponse(foods));
});

foodController.get('/find/:id', async (req, res) => {
  const food = await getFoodById(req.params.id);

  if (food) {
    res.status(200).json(createResponse(food));
  } else {
    res.status(404).json(createResponse(null, 'Could not find food with this ID!'));
  }
});

foodController.put('/update/:id', async (req, res) => {
  const updated = await putFood(req.body, req.params.id);

  if (updated[0] > 0) {
    res.status(200).json(createResponse(updated[1][0]));
  } else {
    res.status(404).json(createResponse(null, 'Could not update food with this ID!'));
  }
});

foodController.post('/add', async (req, res) => {
  const food = await addFood({ ...req.body });

  res.status(201).json(createResponse(food, 'Food item created successfully!'));
});

foodController.delete('/delete/:id', async (req, res) => {
  const deletedRows = await deleteFood(req.params.id);

  if (deletedRows > 0) {
    res.status(200).json(createResponse());
  } else {
    res.status(404).json(createResponse(null, 'Could find food with this ID to delete!'));
  }
});

export { foodController };
