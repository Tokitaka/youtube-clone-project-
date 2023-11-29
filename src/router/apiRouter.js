import express from "express";
import {createViews} from "../controller/videoController"
const apiRouter = express.Router();

//api/videos/:id/views
apiRouter.post("/videos/:id([0-9a-f]{24})/view", createViews);

export default apiRouter;