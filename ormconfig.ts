import config from './src/common/config';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = config;

export default {
  name: 'default',
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT) || 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ['./src/models/**/*.ts'],
  migrations: ['./migrations/**/*.ts'],
  cli: {
    entitiesDir: './src/models',
    migrationsDir: './migrations',
  },
};
