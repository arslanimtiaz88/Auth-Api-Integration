import Cors from 'cors';
import initMiddleware from './init-middleware';

export const cors = initMiddleware(
  Cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);
