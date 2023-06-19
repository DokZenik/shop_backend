import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../Models/ProductModel.js";
import productRoute from "./ProductRoutes.js";
import Comment from "../Models/CommentModel.js";

const commRoute = express.Router();

// GET ALL COMMENTS
commRoute.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const comments = await Comment.find({"itemId": req.params.id});
        // console.log(comments)
        res.json(comments);
    })
);
commRoute.post(
    '/save',
    asyncHandler(async (req, res) => {
        console.log(req.body)
        try {
            Comment.create(req.body)

            const modifyItem = await Product.findOne({"_id": req.body.itemId})
            await modifyItem.updateOne({"rating": modifyItem.rating + parseInt(req.body.rating), "numReviews": modifyItem.numReviews + 1})

            res.json({"responseStatus": "200"})
        }catch (e){
            res.json({"responseStatus": "500"})
        }


    })
)
export default commRoute