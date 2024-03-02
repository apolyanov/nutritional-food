import express from 'express';
import cors from 'cors';
import { setupDatabase, setupSequelize } from './db.config.js';
import { foodController } from './controllers/index.js';

const globalRouter = express.Router();

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

globalRouter.use('/food', foodController);

app.use('/api/v1', globalRouter);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  await setupDatabase();
  await setupSequelize();

  await console.log(`Server is running on port ${PORT}.`);
});
