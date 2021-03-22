require('dotenv').config();

export const PORT = process.env.PORT;

export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PASS = process.env.DB_PASS;
export const DB_SOCKET_PATH = process.env.DB_SOCKET_PATH;
export const ORIGIN_URL = process.env.ORIGIN_URL;

export const CLIENT_KEY = process.env.CLIENT_KEY;
export const CLIENT_CERT = process.env.CLIENT_CERT;
export const SERVER_CA = process.env.SERVER_CA;
