import express from 'express';
import controller from "../controllers/authController.js";
import {check} from "express-validator";
import authMiddleware from "../Middleware/authMiddlware.js";

const authRouter = express.Router();
// LOGIN
authRouter.post('/registration', controller.registration)
authRouter.post('/login', controller.login)
authRouter.get('/users', authMiddleware, controller.testToken)
authRouter.get('/user/:email', authMiddleware, controller.getUser)

export default authRouter;
