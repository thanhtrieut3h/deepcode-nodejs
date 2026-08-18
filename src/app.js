import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import routes from './routes/index.js';
// import { testConnection } from './config/database.js';

dotenv.config(); // ho tro lay thong tin tu file .env

const app = express(); // khoi tao express - framework

// bao mat cac middleware
app.use(helmet());
// cors
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
//compression
app.use(compression());
//Body parser
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true, limit: '10mb'}));
//logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// test connect to database
// await testConnection();

//Routes
app.use('/api/v1', routes);


export default app;