import passport from 'passport'
import jwtStrategy from './passport/jwtStrategy'
import { localStrategyLogin } from './passport/localStrategy'

passport.use('login', localStrategyLogin)
passport.use(jwtStrategy)

export default passport
