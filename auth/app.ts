import express, { Application, Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError, NotFoundError, errorHandler } from "@cygnetops/common-v2";
import User from "./models/User";
import userRoute from './routes/user';
import cors from 'cors';
const app: Application = express();
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Hello World!",
        });
});
const JWT_SECRET = "skm";
app.use("/api/users", userRoute)


app.post("/api/users/signup", [
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

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);
export default app;
