import { Router } from 'express'

import authRouter from './api/auth.js'
import openingHourRouter from './api/openingHour.js'
import storeRouter from './api/store.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/store', storeRouter)
router.use('/store/:id', openingHourRouter)

router.get('/', async (req, res) => {
  res.status(200).send('Api Running')
  }
)

export default router
