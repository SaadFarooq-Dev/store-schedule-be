import { Router } from 'express'

import authRouter from './api/auth'
import openingHourRouter from './api/openingHour'
import storeRouter from './api/store'

const router = Router()

router.use('/auth', authRouter)
router.use('/store', storeRouter)
router.use('/store/:id', openingHourRouter)

router.get('/', async (req, res) => {
  res.status(200).send('Api Running')
  }
)

export default router
