import model from '../models';

const { Store } = model

const isStoreOwner =  async (req, res, next) => {

  const storeId = req.params.id
  const store = await Store.findByPk(storeId)

  if (!store) {
    return res.status(404).json({ error: "Store not found" })
  }

  if (store.userId !== req.user.id) {
    return res.status(403).json({ error: "Unauthorized" })
  }
  next()
}

export default isStoreOwner
