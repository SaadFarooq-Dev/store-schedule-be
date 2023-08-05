import jwt from 'jsonwebtoken'

import model from '../models/index.js';

const { User } = model

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ where: { email } })
    if (user) {
      return res.status(400).json({ errors: [{ message: 'User already exists' }] })
    }
    user = await User.create({ name, email, password });
    user = user.toJSON();
    delete user.password
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    jwt.sign(
      req.user,
      process.env.JWTSECRET,
      { expiresIn: 360000 },
      async (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (error) {
    next(error)
  }
}

export const verifyToken = async (req, res, next) => {
  return res.status(200).json({ isValid: true })
}
