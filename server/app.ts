require('dotenv').config();
import express, { NextFunction,Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import {ErrorMiddleware} from "./middleware/error";
import userRouter from "./route/user.route";
import courseRouter from "./route/course.route";
//body parser for using cloud energy
app.use(express.json({limit: "50mb"}));

//cookie parser where we are sending data from fronend
app.use(cookieParser());

//cors => cross origin resource sharing
app.use(
    cors({
    origin: ['http://localhost:3000'],
    credentials: true,
})
);
//routes
app.use("/api/v1",userRouter)

app.use("/api/v1",courseRouter)

//testing api
app.get("/test", (req:Request,res:Response, next:NextFunction) =>{
    res.status(200).json({
        Success:true,
        message:"API is working",
    });
});

//unknown route
app.all("*", (req:Request, res:Response, next:NextFunction) =>{
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

app.use(ErrorMiddleware);