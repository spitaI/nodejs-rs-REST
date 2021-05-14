import app from './app.js';
import config from './common/config.js';

const { PORT, NODE_ENV } = config;

app.listen(PORT, () => {
  if (NODE_ENV === 'development') {
    process.stdout.write(`App is running on http://localhost:${PORT}\n`);
  }
});
