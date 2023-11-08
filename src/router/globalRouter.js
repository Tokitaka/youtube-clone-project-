import express from "express";
import {login, join} from "../controller/userController";
import {trending} from "../controller/videoController";

const globalRouter = express.Router();

globalRouter.get('/join',join);
globalRouter.get('/login',login);
globalRouter.get('/trending',trending);

export default globalRouter;