import express from "express";
import authMiddlware from "../Middleware/authMiddlware.js";
import historyController from "../controllers/historyOrderController.js"


const historyRoute = express.Router();

historyRoute.get("/getAll/:userId", authMiddlware, historyController.getAllByUserId)
historyRoute.get("/getAll", authMiddlware, historyController.getAll)
historyRoute.post("/addItem", authMiddlware, historyController.saveItem)

export default historyRoute;