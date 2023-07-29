import express from 'express';
const staticBannersRoute = express.Router();

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
staticBannersRoute.post('/api/static-banners', async (req, res) => {
    try {
        const { altText } = req.body;
        const newStaticBanner = new StaticBannerModel({ imageUrl: req.file.path, altText });
        await newStaticBanner.save();
        res.json(newStaticBanner);
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