import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

mongoose.connect(`${process.env.MONGODB_URL}`).then(()=>console.log(`Database connected!`)).catch((error)=>console.log(error));

app.listen(process.env.PORT || 3001, (req,res) => {
    console.log(`Server runing on port : ${process.env.PORT || 3001}`)
});