import User from "../Models/UserModel.js";
import Role from "../Models/Role.js";
import bcrypt from "bcryptjs";
import {validationResult} from "express-validator"
import jwt from "jsonwebtoken";
import secConfig from "../config/SecureConfig.js";

const generateAccessToken = (id, roles) => {
    const payload = {
        id, roles
    }
    return jwt.sign(payload, secConfig.secret, {expiresIn: "1h"})
}

class authController {
    async registration(req, res) {
        try {
            // const errors = validationResult(req)
            // if(!errors.isEmpty())
            //     return res.status(400).json({message: "Registration error", errors})
            const {username, email, password} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: "User with current username already exists"})
            }
            const hashedPassword = bcrypt.hashSync(password, 12)
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, email, password: hashedPassword, roles: [userRole.value]})
            await user.save()
            return res.status(200).json({message: "User was successfully created"})
        } catch (e) {
            res.status(400).json({message: "Registration error"})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            //console.log(email + " " + password)
            const user = await User.findOne({email})
            if (!user)
                return res.status(400).json({message: "User undefined"})
            if (!bcrypt.compareSync(password, user.password))
                return res.status(401).json({message: "incorrect credentials"})
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token: token, roles: user.roles, username: user.username})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }

    async getUser(req, res) {
        try {
            const email = req.params.email
            const user = await User.findOne({email})
            res.status(200).json({email: user.email, roles: user.roles, createdAt: user.createdAt, username: user.username})
        } catch (e) {
            res.status(400).json({message: "Smth was wrong"})
        }
    }

    async testToken(req, res) {
        try {
            res.json("server works")
        } catch (e) {

        }
    }
}

export default new authController();