

import express from 'express';
import authRouter from './routes/auth.js';
import dotent from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotent.config();


const connect = async() =>{

    try {
        await mongoose.connect(process.env.MONGO);
    console.log("Connect to monogoDB")
        
    } catch (error) {
        throw error
    }
};

mongoose.connection.on("connected", () =>{

    console.log("Connected monogoDB")
  })
  
  
  mongoose.connection.on("disconnected", () =>{
  
      console.log("Disconnect monogoDB")
  })
  


app.use(cors());
app.use(cookieParser());

app.use(express.json())



app.use('/api/auth', authRouter);


app.listen(8800, () => {

    connect();
    console.log('Server is running ');
})