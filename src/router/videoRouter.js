import express from "express";
import {
    watch, 
    getEdit, 
    postEdit, 
    deleteVideo, 
    getUpload, 
    postUpload} from "../controller/videoController";
    import { protectorMiddleware } from "../middlewares";

const videoRouter = express.Router();


videoRouter.get('/:id([0-9a-f]{24})', watch)
videoRouter.route('/:id([0-9a-f]{24})/edit').all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.get('/:id([0-9a-f]{24})/delete', protectorMiddleware, deleteVideo);
videoRouter.route('/upload').all(protectorMiddleware).get(getUpload).post(postUpload);

export default videoRouter;