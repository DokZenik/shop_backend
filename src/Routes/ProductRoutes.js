import express from 'express';
import multer from 'multer';
import asyncHandler from 'express-async-handler';
import Product from '../Models/ProductModel.js';

const productRoute = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

// GET ALL PRODUCTS
productRoute.get(
    '/',
    asyncHandler(async (req, res) => {
        const products = await Product.find();
        res.json(products);
    })
);

// GET SINGLE PRODUCT
productRoute.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    })
);

// ADD NEW PRODUCT
productRoute.post(
    '/',
    upload.array('images', 4), // 'images' is the name of the file input field in the request form, and 4 is the maximum number of images allowed
    asyncHandler(async (req, res) => {
        const {name, description, price, categories, countInStock} = req.body;

        const images = req.files.map((file) => `/uploads/${file.filename}`); // Set the image paths as an array

        const newProduct = new Product({
            name,
            description,
            price,
            images,
            categories,
            countInStock
        });

        const createdProduct = await newProduct.save();
        res.status(201).json(createdProduct);
    })
);

// UPDATE PRODUCT
productRoute.post(
    '/:id/edit',
    upload.array('images', 4), // 'images' is the name of the file input field in the request form, and 4 is the maximum number of images allowed
    asyncHandler(async (req, res) => {
        const {id} = req.params;
        const {name, description, price, categories, countInStock} = req.body;

        const updatedProduct = {
            name,
            description,
            price,
            categories,
            countInStock
        };

        if (req.files && req.files.length > 0) {
            updatedProduct.images = req.files.map((file) => `/uploads/${file.filename}`); // Set the image paths as an array
        }

        const product = await Product.findByIdAndUpdate(id, updatedProduct, {new: true});

        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    })
);

productRoute.delete(
    '/delete/:id',
    asyncHandler(async (req, res) => {
        const product = await Product.deleteOne({_id: req.params.id});

        if (product) {
            res.json({message: "Item was successfully deleted"});
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
        // console.log(req.params.id)
    })
);


export default productRoute;
