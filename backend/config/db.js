import mongoose from "mongoose";

const connectDB= async()=>{
    try {
        
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to db")

    } catch (error) {
        console.log(`ERROR :${error.message}`);
        process.exit(1)
    }
};


export default connectDB;