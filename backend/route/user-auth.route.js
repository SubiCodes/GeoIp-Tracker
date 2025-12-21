import { Router } from "express";
import { signIn, signOut, signUp, validateUserCookie } from "../controller/user-auth.controller.js";


const userAuthRouter = Router();

userAuthRouter.post('/signup', signUp);
userAuthRouter.post('/signin', signIn);
userAuthRouter.post('/signout', signOut);
userAuthRouter.get('/validate-cookie', validateUserCookie);

export default userAuthRouter;