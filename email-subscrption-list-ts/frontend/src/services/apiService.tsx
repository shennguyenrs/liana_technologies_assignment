import axios from 'axios';

import { CustomerData } from '../interfaces/CustomerData';

const baseUrl = '/db/customers';

// Get all data from backend
const getAll = async (): Promise<CustomerData[]> => {
  const req = await axios.get(baseUrl);
  return req.data;
};

export default { getAll };
