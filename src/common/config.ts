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
  USE_FASTIFY?: string;
};

export default (): Config => {
  const {
    LOGS_DIRNAME,
    PORT,
    NODE_ENV,
    JWT_SECRET,
    AUTH_MODE,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    PG_SERVICE,
  } = process.env;

  return {
    APP_ROOT: path.join(__dirname, '../..'),
    LOGS_DIRNAME,
    PORT,
    NODE_ENV,
    JWT_SECRET,
    AUTH_MODE: AUTH_MODE === 'true',
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    PG_SERVICE,
  };
};
