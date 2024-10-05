import path from 'path'
import express from "express"
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()
const port =process.env.PORT || 5000


connectDB()

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', process.env.FRONTEND_URL],
    exposedHeaders: ['set-cookie'],
  })
);


app.get("/",(req,res)=>{
    res.send("Hello Welcome to SRG Store")
})

app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No Content
});


app.use("/api/users",userRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/products",productRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api/orders",orderRoutes)


app.listen(port,()=>{
  try {
    console.log(`server running on  port ${port} `)
  } catch (error) {
        console.log(error)    
  }
})

