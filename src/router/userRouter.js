import express from "express";
import {edit, deleteUser} from "../controller/userController";

const userRouter = express.Router();

userRouter('/edit',edit);
userRouter('/delete',deleteUser);

export default userRouter;