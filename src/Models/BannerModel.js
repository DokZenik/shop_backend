import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
    imageUrl:[{
        type: String
    }],
    altText: String,
});

const BannerModel = mongoose.model('Banner', bannerSchema);

export default BannerModel;
