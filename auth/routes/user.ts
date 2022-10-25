import express,{Request, Response} from "express";
import {body} from 'express-validator';
import { validateRequest, BadRequestError, NotFoundError, errorHandler } from "@cygnetops/common-v2";
import User from "../models/User";
import jwt from 'jsonwebtoken';
const router = express.Router();
const JWT_SECRET="sl";
router.post("/signin", [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
    .trim()
    .notEmpty()
    .withMessage("You must supply a password"),
],
validateRequest,
async (req: Request, res: Response) => {
     const {email, password} = req.body;
     const foudUser = await User.findOne({email:email});
     if(!foudUser){
        throw new BadRequestError("Invalid credentials");
     }
     const isUserdExist = await User.compare(foudUser.password, password);
     let token;
     if (!isUserdExist) {
        throw new BadRequestError("Invalid credentials");
    }else{
        token = jwt.sign({id:foudUser.id, name:foudUser.name}, JWT_SECRET, {
            expiresIn: '2 days',
        });
    }
        
     res.send({isUserdExist: foudUser, token:token})

})


router.post("/signup", [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
    .trim()
    .notEmpty()
    .withMessage("You must supply a password"),
],
validateRequest,
async (req: Request, res: Response) => {
     const {email, password, name} = req.body;
     const user = new User({email, password, name});
     await user.save();
         
     res.send({"user":user})

})


export default router
