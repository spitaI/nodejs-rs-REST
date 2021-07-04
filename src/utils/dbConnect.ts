import { Connection, createConnection } from 'typeorm';

import ExpressLogger from './logger';
import { DEFAULT_RETRIES, DEFAULT_WAIT_TIMEOUT } from '../constants/database';

type ConnectionConfig = {
  retries?: number;
  logger?: ExpressLogger;
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const connect = async ({
  retries,
  logger,
}: ConnectionConfig): Promise<Connection> => {
  let connection = null;
  let retriesLeft = retries || DEFAULT_RETRIES;
  while (retriesLeft) {
    try {
      connection = await createConnection();
      if (connection) break;
    } catch (e) {
      retriesLeft -= 1;

      if (logger) {
        const date = new Date().toISOString();
        logger.error(`[${date}] ${e.message}`);
        logger.error(
          `[${date}] ==> Retrying connect to db, retries left: ${retriesLeft}`
        );
      }

      await wait(DEFAULT_WAIT_TIMEOUT);
    }
  }

  if (!connection) {
    throw new Error(`Can't connect to DB`);
  }

  return connection;
};
