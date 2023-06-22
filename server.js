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
import multer from "multer";

dotenv.config();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save the uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });
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
// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => console.log(`server run in port ${PORT}`));
