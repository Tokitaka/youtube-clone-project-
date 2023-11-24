import express from "express";
import {getLogin, getJoin, postJoin, postLogin} from "../controller/userController";
import {home, search} from "../controller/videoController";

const rootRouter = express.Router();

rootRouter.get('/',home);
rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.route('/login').get(getLogin).post(postLogin);
//search -> globalRouter , /viedos/search (X)
rootRouter.get('/search',search);


export default rootRouter;