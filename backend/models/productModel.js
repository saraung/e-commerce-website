import mongoose from "mongoose";

const {ObjectId}=mongoose.Schema

const reviewSchema=mongoose.Schema({
    name:{type:String, required:true},
    rating:{type:Number, required:true, min:1, max:5},
    comment:{type:String, required:true},
    // product:{type:ObjectId, ref:'Product', required:true},
    user:{type:mongoose.Schema.Types.ObjectId, required:true,ref:'User'}
},{timestamps:true})

const productSchema=mongoose.Schema({
    name:{type:String, required:true},
    images:[{type:String,required:true}],
    brand:{type:String, required:true},
    quantity:{type:Number, required:true},
    category:{type:ObjectId, ref:'Category', required:true},
    reviews:[reviewSchema],
    description:{type:String, required:true},
    price:{type:Number, required:true,default:0},
    rating:{type:Number, required:true,default:0},
    numReviews:{type:Number, required:true, default:0},
    countInStock:{type:Number,required:true,default:0}
},{timestamps:true})

const Product=mongoose.model('Product',productSchema)
export default Product;