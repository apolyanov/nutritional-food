import express from 'express';
import cors from 'cors';
import { setupDatabase, setupSequelize } from './db.config.js';
import { foodController } from './controllers/index.js';

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/food', foodController);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  await setupDatabase();
  await setupSequelize();

  await console.log(`Server is running on port ${PORT}.`);
});
