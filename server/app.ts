require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/error';
import userRouter from './routes/userRouter';
import travelRouter from './routes/travelRouter';

// body parser
app.use(express.json({ limit: '50mb' }));
app.disable('x-powered-by')

// cookie parser
app.use(cookieParser());

// cors => Cross Origin Resource Sharing
// app.use(
//   cors({
//     origin: process.env.ORIGIN,
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     optionsSuccessStatus: 200,
//   })
// );

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN as any)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-requested-With, Content-Type, Authorization')
  next()
})


// routes
app.use('/api/v1', userRouter);
app.use('/api/v1', travelRouter);

// testing API
app.get('/test', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: 'API is working' });
});

// unknown route
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(errorMiddleware);
