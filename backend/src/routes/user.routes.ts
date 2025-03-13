import { Hono } from "hono";
import { getUsers, userProfile, userSignin, userSignup } from "../controllers/user.controller";
import { authMiddleware } from "../controllers/auth.controller";

const userRouter = new Hono();

userRouter.post('/signup', userSignup)

userRouter.post('/signin', userSignin)

userRouter.get('/', authMiddleware, getUsers)

userRouter.get('/me', authMiddleware, userProfile)

export default userRouter;