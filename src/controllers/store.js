import model from '../models';

const { Store, User } = model

export const createStore = async (req, res, next) => {
  const { name } = req.body
  try {
    const store = await Store.create({ name, userId: req.user.id })
    return res.status(200).json({ message: 'Success', store })
  } catch (error) {
    next(error)
  }
}

export const getAllUserStores = async (req, res, next) => {
  try {
    const stores = await Store.findAll({ where: { userId: req.user.id }, include: [{ model: User }] })
    return res.status(200).json({ message: 'Success', stores })
  } catch (error) {
    next(error)
  }
}

export const getStore = async (req, res, next) => {

  const id = req.params.id
  const userId = req.user.id

  try {
    const store = await Store.findOne({ where: { id: id, userId: userId } })
    if (store) {
      return res.status(200).json({ message: 'Success', store })
    }
    return res.status(400).json({ errors: [{ message: 'Not Found' }] })
  } catch (error) {
    next(error)
  }
}

export const updateStore = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id

    const [rowsUpdate, [store]] = await Store.update(req.body, { where: { id: id, userId: userId }, returning: true })

    if (store) {
      return res.status(200).json({ message: 'Success', store })
    }
    return res.status(400).json({ errors: [{ message: 'Not Found' }] })
  } catch (error) {
    next(error)
  }
}

export const deleteStore = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id

    const store = await Store.destroy({ where: { id: id, userId: userId } })

    if (store) {
      return res.status(200).json({ message: 'Success', store })
    }
    return res.status(400).json({ errors: [{ message: 'Not Found' }] })
  } catch (error) {
    next(error)
  }
}
