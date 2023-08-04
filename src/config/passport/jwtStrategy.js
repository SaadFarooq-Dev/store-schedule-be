import passportJWT from 'passport-jwt'

import model from '../../models';

const { User } = model;

const ExtractJwt = passportJWT.ExtractJwt
const JWTstrategy = passportJWT.Strategy

export default new JWTstrategy(
  {
    secretOrKey: process.env.JWTSECRET,
    jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
    passReqToCallback: true
  },
  async (req, token, done) => {
    try {
      const { email } = token
      const user = await User.findOne({ where: { email } })
      if (user) {
        req.user = user.toJSON()
        return done(null, user)
      }
      return done(null, false, { message: 'Invalid user token' })
    } catch (err) {
      return done(err)
    }
  }
)
