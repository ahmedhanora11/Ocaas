import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
//router import
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express();
dotenv.config();

//use route localhost:5000/posts


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

//Mongo link here using cloud
//const CONNECTION_URL = 'mongodb+srv://ahmedhanora11:Dede7dede7.@cluster0.m4sqa1b.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true } )
.then(() => app.listen(PORT, () => console.log(`The server is running on port: ${PORT}`)))
.catch((error) => console.log(error.message));


