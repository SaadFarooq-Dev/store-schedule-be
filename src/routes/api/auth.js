import { Router } from "express";
import passport from "passport";
import { loginUser, registerUser, verifyToken } from "../../controllers/auth";
import { authenticateJWT } from "../../middleware/jwtAuthenticate";

const authRouter = Router()

authRouter.post('/signup', registerUser)
authRouter.post('/login', passport.authenticate('login', { session: false, failWithError: true }), loginUser)
authRouter.get('/verify', authenticateJWT, verifyToken)

export default authRouter
