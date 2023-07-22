import express from "express";
import asyncHandler from "express-async-handler";
import SellerApplication from "../Models/SellerApplicationModel.js";
import User from "../Models/UserModel.js";

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

        const candidate = await User.findOne({email: req.body.formDate.email})
        // console.log(candidate)
        if (candidate && !candidate.roles.includes("ADMIN")) {
            try {
                console.log(req.body.formDate)
                await SellerApplication.create(req.body.formDate)
                return res.status(200).json({message: "application was successfully created"})
            } catch (e) {
                return res.status(500).json({message: "application wasn't created"})
            }
        } else {
            return res.status(400).json({message: "User with current username does not exist"})
        }


    })
)
sellerRoute.post(
    "/application/approve/:id",
    asyncHandler(async (req, res) => {
        try{
            const application = await SellerApplication.findOne({"_id": req.params.id})
            await application.updateOne({"status": "APPROVED"})
            const candidate = await User.findOne({email: application.email})
            await candidate.updateOne({"roles": ["SELLER"]})
            return res.status(200).json({message: "application was approved"})
        }catch (e){
            return res.status(400).json({message: "application wasn't approved"})
        }

    })
)
sellerRoute.post(
    "/application/decline/:id",
    asyncHandler(async (req, res) => {
        try {
            const application = await SellerApplication.findOne({"_id": req.params.id})
            await application.updateOne({"status": "DECLINED"})
            return res.status(200).json({message: "application was declined"})
        }catch (e) {
            return res.status(400).json({message: "application wasn't declined"})
        }

        //decline realisation
    })
)
export default sellerRoute