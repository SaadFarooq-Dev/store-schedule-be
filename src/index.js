import 'dotenv/config'

import express from 'express';
import cors from 'cors'
import morgan from 'morgan'

import errorHandler from './middleware/errorHandler.js';
import _initializePassport from './config/passport.js'
import router from './routes/index.js';

const app = express();

app.use(cors('*'))
app.use(morgan('tiny'))
app.use(express.json({ extended: false }))

app.use('/', router)

app.use(errorHandler)

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`server is running on port ${port}`))

export default app
