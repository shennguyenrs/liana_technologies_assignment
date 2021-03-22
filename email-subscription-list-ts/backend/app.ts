import express from 'express';
import cors from 'cors';

import appRouter from './controllers/appRouter';

import logger from './utils/logger';
import dbConnection from './utils/getConnect';
import middleware from './utils/middleware';

const app: express.Application = express();

logger.info('Connecting to database...');
dbConnection.connect((err: Error) => {
  if (err) {
    logger.error('Failed to connect database: ' + err.message);
    process.exit(1);
  }

  logger.info('Connect to database successfully');
});

app.use(express.json());
app.use(cors());
app.use(middleware.reqLogger);

app.use(express.static('build'));

app.use('/db/customers', appRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
