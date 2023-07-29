import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDatabase from './src/config/MongoDB.js';
import ImportData from './DataImport.js';
import productRoute from './src/Routes/ProductRoutes.js';
import { notFound, errorHandler } from './src/Middleware/Errors.js';
import authRouter from './src/Routes/UserRoutes.js';
import cors from "cors";
import commRoute from "./src/Routes/CommentsRoutes.js";
import cartRoute from "./src/Routes/CartRoutes.js";
import historyRoute from "./src/Routes/HistoryRoutes.js";
import categoryRoute from "./src/Routes/CategoeyRoute.js";
import subscribeRoute from "./src/Routes/SubscribeRoute.js";
import bannerRoute from "./src/Routes/BannersRoute.js";
import sellerRoute from "./src/Routes/SellerRoutes.js";
import staticBannersRoute from "./src/Routes/StaticBannersRoute.js";
import authController from "./src/controllers/authController.js";

dotenv.config();
connectDatabase();
const app = express();
// Get the current module file path
const __filename = fileURLToPath(import.meta.url);
// Get the current module directory name
const __dirname = dirname(__filename)
app.use(express.json());
app.use(cors({origin: "*"}))

// API
app.use('/api/import', ImportData);
app.use('/api/products', productRoute);
app.use('/api/auth', authRouter);
app.use('/api/comments', commRoute)
app.use('/api/cart', cartRoute)
app.use('/api/history', historyRoute)
app.use('/api/categories', categoryRoute)
app.use('/uploads', express.static(join(__dirname, 'uploads')))
app.use('/api/subscribe', subscribeRoute);
app.use('/api/banners', bannerRoute);
app.use('/api/static-banners', staticBannersRoute);
app.use('/api/seller', sellerRoute);
app.post("/api/change-password", authController.changePassword);

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => console.log(`server run in port ${PORT}`));
