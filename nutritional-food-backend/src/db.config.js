import { Sequelize } from 'sequelize';
import pg from 'pg';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from './constants.js';
import { Food } from './models/index.js';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
});

/*
 * Check whether we have database or not and create it if needed.
 * */
const setupDatabase = async () => {
  const client = new pg.Client();

  try {
    await client.connect();
    const dbQuery = await client.query(`SELECT FROM pg_database WHERE datname = $1`, [DB_NAME]);

    if (dbQuery.rows.length === 0) await client.query(`CREATE DATABASE ${DB_NAME}`);
  } catch (error) {
    console.log(error);
  } finally {
    client.end();
  }
};

/*
 * Initialize all available models.
 * NOTE: New models should be added in the Promise.all() array.
 * */
const setupSequelize = async () => {
  await Promise.all([Food().sync()]);
};

const getModels = () => sequelize.models;

export { setupDatabase, setupSequelize, sequelize, getModels };
