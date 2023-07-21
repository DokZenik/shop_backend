import express from "express";
import asyncHandler from "express-async-handler";
import SellerApplication from "../Models/SellerModel.js";

const sellerRoute = express.Router();

sellerRoute.get(
    "/applications",
    asyncHandler(async (req, res) => {
        const applications = await SellerApplication.find();
        res.json(applications)
    })
)
sellerRoute.post(
    "/application/save",
    asyncHandler(async (req, res) => {
        // console.log("TEST SAVE")
        // console.log(req.body)
        try{
            SellerApplication.create(req.body.formDate)
            res.json({message: "application was successfully created"})
        }catch (e) {
            res.json({message: "application wasn't created"})
        }


    })
)
export default sellerRoute