import app from './app';
import config from './common/config';

const { PORT, NODE_ENV } = config;

app.listen(PORT, () => {
  if (NODE_ENV === 'development') {
    process.stdout.write(`App is running on http://localhost:${PORT}\n`);
  }
});
