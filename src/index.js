import 'dotenv/config'

import express from 'express';
import cors from 'cors'
import morgan from 'morgan'

import errorHandler from './middleware/errorHandler';
import _initializePassport from './config/passport'
import router from './routes';

const app = express();

app.use(cors('*'))
app.use(morgan('tiny'))
app.use(express.json({ extended: false }))

app.use('/', router)

app.use(errorHandler)


export default app
