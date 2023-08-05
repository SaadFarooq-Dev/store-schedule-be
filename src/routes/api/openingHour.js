import { Router } from "express";
import { createStoreOpeningHour, deleteStoreOpeningHours, getStoreOpeningHours, updateStoreOpeningHour } from "../../controllers/openingHour.js";
import isStoreOwner from "../../helpers/isStoreOwner.js";
import { authenticateJWT } from "../../middleware/jwtAuthenticate.js";

const openingHourRouter = Router({mergeParams: true})

openingHourRouter
  .route('/openinghours')
  .post(authenticateJWT, isStoreOwner, createStoreOpeningHour)
  .get(authenticateJWT, getStoreOpeningHours)
  .delete(authenticateJWT, isStoreOwner, deleteStoreOpeningHours)

openingHourRouter
  .route('/openinghours/:openingHourId')
  .patch(authenticateJWT, isStoreOwner, updateStoreOpeningHour)

export default openingHourRouter
