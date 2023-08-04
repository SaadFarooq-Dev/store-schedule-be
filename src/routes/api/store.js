import { Router } from "express";
import { createStore, deleteStore, getAllUserStores, getStore, updateStore } from "../../controllers/store";
import { authenticateJWT } from "../../middleware/jwtAuthenticate";

const storeRouter = Router()

storeRouter
  .route('/')
  .post(authenticateJWT, createStore)
  .get(authenticateJWT, getAllUserStores)

  storeRouter
  .route('/:id')
  .get(authenticateJWT, getStore)
  .patch(authenticateJWT, updateStore)
  .delete(authenticateJWT, deleteStore)

export default storeRouter
