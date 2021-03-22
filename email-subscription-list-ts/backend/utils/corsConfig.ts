import { ORIGIN_URL } from './config';

const whiteList = [ORIGIN_URL];

const corsOption = {
  origin: '*',
  //origin: (origin: any, callback: any) => {
  //// Allow requests with no origin
  //// Do not allow requests from any not in the white list
  //if (!origin || whiteList.indexOf(origin) !== -1) callback(null, true);
  //else callback(new Error('No allowed by CORS'), false);
  //},
  //methods: ['GET', 'POST'],
  //allowedHeaders: ['Content-Type'],
  maxAge: 3600,
};

export default corsOption;
