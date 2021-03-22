import { Router, Request, Response, NextFunction } from 'express';

// Config
import { DB_DATABASE } from '../utils/config';

// Interface
import { CustomerData } from '../interfaces/CustomerData';

import dbConnection from '../utils/getConnect';

const appRouter = Router();

appRouter.get('/', (_req: Request, res: Response, next: NextFunction) => {
  // Query statement
  const orderBy = 'timestamp';
  const getAll = `SELECT * FROM ${DB_DATABASE} ORDER BY ${orderBy} DESC;`;

  dbConnection.query(getAll, (err: Error, result, _fields) => {
    if (err) next(err);
    return res.status(200).json(result);
  });
});

appRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const data: CustomerData = req.body;

  // Query statement
  const addNew = `INSERT INTO ${DB_DATABASE} VALUES (CURRENT_TIMESTAMP, "${data.email}", "${data.utm_source}", "${data.utm_medium}", "${data.utm_term}", "${data.utm_campaign}", "${data.utm_content}");`;

  dbConnection.query(addNew, (err: Error, _result, _fields) => {
    if (err) next(err);
    return res.status(200).json(data);
  });
});

export = appRouter;
