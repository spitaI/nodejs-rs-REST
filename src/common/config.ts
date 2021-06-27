import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export default {
  APP_ROOT: path.join(__dirname, '../..'),
  LOGS_DIRNAME: process.env['LOGS_DIRNAME'],
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
  POSTGRES_HOST: process.env['POSTGRES_HOST'],
  POSTGRES_PORT: process.env['POSTGRES_PORT'],
  POSTGRES_USER: process.env['POSTGRES_USER'],
  POSTGRES_PASSWORD: process.env['POSTGRES_PASSWORD'],
  POSTGRES_DB: process.env['POSTGRES_DB'],
  PG_SERVICE: process.env['PG_SERVICE'],
};
