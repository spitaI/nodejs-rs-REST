import dotenv from 'dotenv';
import path from 'path';

import getDirname from '../utils/getDirname.js';

const __dirname = getDirname(import.meta.url);

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
};
