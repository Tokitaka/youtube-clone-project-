import express from "express";
import {getLogin, getJoin, postJoin, postLogin} from "../controller/userController";
import {home, search} from "../controller/videoController";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get('/',home);
rootRouter.route('/join').all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route('/login').all(publicOnlyMiddleware).get(getLogin).post(postLogin);
//search -> globalRouter , /viedos/search (X)
rootRouter.get('/search',search);


export default rootRouter;