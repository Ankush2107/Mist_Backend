import express from 'express';
// import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from 'dotenv';
import mongoose from 'mongoose';
config();

import userRouter from './routes/user.route.js';
const app = express();

const PORT = process.env.PORT || 3000;

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new AppError("Not allowed by CORS"));
//         }
//     },
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Include the necessary HTTP methods
//     credentials: true,
//     optionsSuccessStatus: 204,
// }));

// Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.use(cookieParser());

app.use(morgan("dev"));


// Routes
app.use("/api/user", userRouter);

app.get("/ping", function (req, res) {
    res.send("Pong")
})


app.all("*", (req, res) => {
    res.status(404).send("OOPS!! 404 page not found")
})

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Connected to Database & Server is listening at http://localhost:${PORT}...`);
    })
})
.catch((error) => {
    console.log(error);
})