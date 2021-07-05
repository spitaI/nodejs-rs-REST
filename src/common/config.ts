import path from 'path';

type Config = {
  APP_ROOT: string;
  LOGS_DIRNAME?: string;
  PORT?: string;
  NODE_ENV?: string;
  JWT_SECRET?: string;
  AUTH_MODE?: boolean;
  POSTGRES_HOST?: string;
  POSTGRES_PORT?: string;
  POSTGRES_USER?: string;
  POSTGRES_PASSWORD?: string;
  POSTGRES_DB?: string;
  PG_SERVICE?: string;
};

export default (): Config => ({
  APP_ROOT: path.join(__dirname, '../..'),
  LOGS_DIRNAME: process.env['LOGS_DIRNAME'],
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  JWT_SECRET: process.env['JWT_SECRET'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
  POSTGRES_HOST: process.env['POSTGRES_HOST'],
  POSTGRES_PORT: process.env['POSTGRES_PORT'],
  POSTGRES_USER: process.env['POSTGRES_USER'],
  POSTGRES_PASSWORD: process.env['POSTGRES_PASSWORD'],
  POSTGRES_DB: process.env['POSTGRES_DB'],
  PG_SERVICE: process.env['PG_SERVICE'],
});
