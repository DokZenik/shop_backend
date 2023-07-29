import mongoose from 'mongoose';

const staticBanners = new mongoose.Schema({
    imageUrl:[{
        type: String
    }],
    altText: String,
});

const StaticBannerModel = mongoose.model('StaticBannerModel', staticBanners);

export default StaticBannerModel;
