import express from "express";
import {
    getEditProfile, 
    postEditProfile, 
    logout, 
    startGithubLogin, 
    finishGithubLogin} from "../controller/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin);
userRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin);
userRouter.get('/logout', protectorMiddleware, logout);
userRouter.route('/edit').all(protectorMiddleware).get(getEditProfile).post(postEditProfile);
// userRouter.get('/:id',see); 

export default userRouter;