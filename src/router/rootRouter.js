import express from "express";
import {login, getJoin, postJoin} from "../controller/userController";
import {home, search} from "../controller/videoController";

const rootRouter = express.Router();

rootRouter.get('/',home);
rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.get('/login',login);
//search -> globalRouter , /viedos/search (X)
rootRouter.get('/search',search);

export default rootRouter;