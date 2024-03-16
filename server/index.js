import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from 'dotenv';
config();
const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new AppError("Not allowed by CORS"));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Include the necessary HTTP methods
    credentials: true,
    optionsSuccessStatus: 204,
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/ping", function (req, res) {
    res.send("Pong")
})

app.get("/", (req, res) => {
    res.send("Hii")
});

app.all("*", (req, res) => {
    res.status(404).send("OOPS!! 404 page not found")
})

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}...`);
})