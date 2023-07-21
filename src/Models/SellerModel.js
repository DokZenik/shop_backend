import mongoose from 'mongoose';

const sellerApplicationSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        websiteLink: {
            type: String,
            required: true
        },
        ico: {
            type: String,
            required: true
        },
        productsType: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)
const SellerApplication = mongoose.model('SellerApplication', sellerApplicationSchema);

export default SellerApplication;