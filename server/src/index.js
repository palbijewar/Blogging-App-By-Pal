import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.listen(process.env.PORT || 3001, (req,res) => {
    console.log(`Server runing on port : ${process.env.PORT || 3001}`)
});