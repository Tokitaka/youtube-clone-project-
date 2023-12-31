import express from "express";

import {
    getEditProfile, 
    postEditProfile, 
    logout, 
    startGithubLogin, 
    finishGithubLogin,
    getChangePassword,
    postChangePassword,
    userProfile} from "../controller/userController";
import { protectorMiddleware, publicOnlyMiddleware, avatarUpload } from "../middlewares";

const userRouter = express.Router();

userRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin);
userRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin);
userRouter.get('/logout', protectorMiddleware, logout);
userRouter.route('/edit').all(protectorMiddleware).get(getEditProfile).post(avatarUpload.single('avatar'), postEditProfile);
userRouter.route('/change-password').all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get('/:id', userProfile); 

export default userRouter;