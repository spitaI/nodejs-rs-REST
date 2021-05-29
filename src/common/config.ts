import dotenv from 'dotenv';
import path from 'path';

import getDirname from '../utils/getDirname';

const dirname = getDirname(import.meta.url);

dotenv.config({
  path: path.join(dirname, '../../.env'),
});

export default {
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
};
