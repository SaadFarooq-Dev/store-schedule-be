import { Router } from "express";
import passport from "passport";
import { loginUser, registerUser, verifyToken } from "../../controllers/auth.js";
import { authenticateJWT } from "../../middleware/jwtAuthenticate.js";

const authRouter = Router()

authRouter.post('/signup', registerUser)
authRouter.post('/login', passport.authenticate('login', { session: false, failWithError: true }), loginUser)
authRouter.get('/verify', authenticateJWT, verifyToken)

export default authRouter
