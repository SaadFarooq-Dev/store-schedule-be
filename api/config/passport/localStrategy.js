import passportLocal from 'passport-local'

import model from '../../models/index.js';

const { User } = model;

const LocalStrategy = passportLocal.Strategy

export const localStrategyLogin = new LocalStrategy(
  {
    usernameField: 'email'
  },
  async (email, password, done) => {

    let user = await User.scope('withPassword').findOne({ where: { email } })

    if (!user) {
      return done(null, false, { message: 'User not found' })
    }
    try {
      const isPasswordValid = await user.isValidPassowrd(password)

      if (!isPasswordValid) {
        return done(null, false, { message: "password didn't match" });
      } else {
        user = user.toJSON();
        delete user.password
        return done(null, user, { message: "logged in successfully" });
      }

    } catch (error) {
      return done(error)
    }
  }
)
