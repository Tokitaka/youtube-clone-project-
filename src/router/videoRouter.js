import express from "express";
import {see, edit, deleteVideo, upload} from "../controller/videoController";

const videoRouter = express.Router();

videoRouter.get('/upload').get(getUpload).post(postUpload);
videoRouter.get('/:id', watch)
videoRouter.get('/:id/edit').get(getEdit).post(postEdit);
videoRouter.get('/:id/delete', deleteVideo)

export default videoRouter;