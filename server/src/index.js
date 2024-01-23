import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/users.routes.js'

dotenv.config();

const app = express();

app.use(express.json())

mongoose.connect(`${process.env.MONGODB_URL}`).then(()=>console.log(`Database connected!`)).catch((error)=>console.log(error));

app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
 const statusCode = err.statusCode || 500;
 const message = err.message || "Internam server error";
 res.status(statusCode).json({
    success:false,
    statusCode,
    message
 });
});

app.listen(process.env.PORT || 3001, (req,res) => {
    console.log(`Server runing on port : ${process.env.PORT || 3001}`)
});