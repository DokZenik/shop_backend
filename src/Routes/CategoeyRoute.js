import express from "express";
import categoryController from "../controllers/categoryController.js";
import authMiddleware from "../Middleware/authMiddlware.js";

const categoryRoute = express.Router();

categoryRoute.get("/", categoryController.getAll);
categoryRoute.post("/", authMiddleware, categoryController.create); // Add a new POST route for creating a category

export default categoryRoute;