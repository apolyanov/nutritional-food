import express from 'express';
import { getModels } from '../db.config.js';
import { createResponse } from '../utils.js';

const foodController = express.Router();

foodController.get('/all', async (req, res) => {
  const foods = await getModels().Food.findAll();

  res.status(200).json(createResponse(foods));
});

foodController.get('/:id', async (req, res) => {
  const food = await getModels().Food.findByPk(req.params.id);

  if (food) {
    res.status(200).json(createResponse(food));
  } else {
    res.status(404).json(createResponse(null, 'Could not find food with this ID!'));
  }
});

foodController.post('/add', async (req, res) => {
  const food = await getModels().Food.create({ ...req.body });

  res.status(201).json(createResponse(food, 'Food item created successfully!'));
});

foodController.delete('/:id', async (req, res) => {
  const deletedRows = await getModels().Food.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (deletedRows > 0) {
    res.status(200).json(createResponse());
  } else {
    res.status(404).json(createResponse(null, 'Could find food with this ID to delete!'));
  }
});

export { foodController };
