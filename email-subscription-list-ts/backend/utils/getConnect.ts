import mysql from 'mysql';
import fs from 'fs';
import {
  DB_HOST,
  DB_USER,
  DB_DATABASE,
  DB_PASS,
  DB_SOCKET_PATH,
  CLIENT_KEY,
  CLIENT_CERT,
  SERVER_CA,
} from './config';

const config = {
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASS,
  socketPath: DB_SOCKET_PATH,
  //ssl: {
    //ca: fs.readFileSync(SERVER_CA as string),
    //key: fs.readFileSync(CLIENT_KEY as string),
    //cert: fs.readFileSync(CLIENT_CERT as string),
  //},
};

export = mysql.createConnection(config);
