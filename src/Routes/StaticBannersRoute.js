import express from 'express';
import multer from "multer";
import BannerModel from "../Models/BannerModel.js";
const staticBannersRoute = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/StaticBanners/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

//GET request to display static banners
staticBannersRoute.get('/api/static-banners', async (req, res) => {
    try {
        const staticBanners = await StaticBannerModel.find({});
        res.json(staticBanners);
    } catch (err) {
        console.error('Error fetching static banners:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
    // POST request to add a new static banner
staticBannersRoute.post('/api/static-banners', upload.single('image'), async (req, res) => {
    try {
        const { altText } = req.body;
        const imageUrl = req.file.path;
        const staticsBanners = await StaticBannerModel.create({ imageUrl, altText });
        res.status(201).json(staticsBanners);
    } catch (err) {
        console.error('Error adding static banner:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE request to delete a static banner
staticBannersRoute.delete('/api/static-banners/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await StaticBanner.findByIdAndDelete(id);
        res.json({ message: 'Static banner deleted successfully' });
    } catch (err) {
        console.error('Error deleting static banner:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default staticBannersRoute;