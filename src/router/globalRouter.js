import express from "express";
import {login, join} from "../controller/userController";
import {home, search} from "../controller/videoController";

const globalRouter = express.Router();

globalRouter.get('/',home);
globalRouter.get('/join',join);
globalRouter.get('/login',login);
//search -> globalRouter , /viedos/search (X)
globalRouter.get('/search',search);

export default globalRouter;