import express from 'express';
import multer from 'multer';
import asyncHandler from 'express-async-handler';
import BannerModel from '../Models/BannerModel.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/banners/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

const bannerRoute = express.Router()
// Get all banners
bannerRoute.get('/', asyncHandler(async (req, res) => {
    const banners = await BannerModel.find();
    res.json(banners);
}));

// Add a new banner
bannerRoute.post('/', upload.single('image'), asyncHandler(async (req, res) => {
    const { altText } = req.body;
    const imageUrl = req.file.path;
    const banner = await BannerModel.create({ imageUrl, altText });
    res.status(201).json(banner);
}));

// Delete a banner by ID
bannerRoute.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    await BannerModel.findByIdAndDelete(id);
    res.status(204).end();
}));



export default bannerRoute;
