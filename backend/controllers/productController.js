import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

import formidable from "express-formidable";



const createProduct = asyncHandler(async (req, res) => {
    try {
      const { name, description, price, category, quantity, brand, images } = req.fields;
  
  
      // Check for required fields
      if (!name || !description || !price || !category || !quantity || !brand || !images) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // If images are passed as a stringified JSON, parse it to an array
      const imageArray = Array.isArray(images) ? images : JSON.parse(images);
  
      const product = new Product({
        name,
        description,
        price,
        category,
        quantity,
        brand,
        countInStock: quantity, // Assuming countInStock is meant to represent quantity
        images: imageArray,
      });
  
      await product.save();
  
      res.status(201).json({
        status: "success",
        data: product,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: error.message }); // Use 500 for server errors
    }
  });
  

const updateProduct = asyncHandler(async (req, res) => {
    try {
      const updateFields = {};  // Create an empty object to hold the updated fields
  
      // Destructure the fields from req.fields and req.files (if any)
      const { name, description, price, category, quantity, brand ,images,countInStock} = req.fields;
      // const images = req.files?.images; // Only use images if they exist
  
      // Conditionally add the fields to the updateFields object if they are provided
      if (name) updateFields.name = name;
      if (description) updateFields.description = description;
      if (price) updateFields.price = price;
      if (category) updateFields.category = category;
      if (quantity) updateFields.quantity = quantity;
      if (brand) updateFields.brand = brand;
      if(countInStock) updateFields.countInStock = countInStock;
      // If images are passed as a stringified JSON, parse it to an array
      const imageArray = Array.isArray(images)? images : JSON.parse(images);

      // Handle images separately if they exist
      if (images) {
        updateFields.images = imageArray;  // or handle the image processing logic here
      }
  
      // Proceed with updating the product, but only the fields that are in updateFields
      const product = await Product.findByIdAndUpdate(
        req.params.id, 
        updateFields,  // Use the dynamically created updateFields object
        { new: true, runValidators: true }  // Return the updated document
      );
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json(product);
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });
  
  const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            // If the product is not found, send a 404 response
            return res.status(404).json({ error: "Product not found" });
          }
      
          res.json({ status: "success", message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
  })

const fetchProducts = asyncHandler(async (req, res) => {
    try {
        
    const pageSize=10
    const keyword=req.query.keyword?{name:{$regex:req.query.keyword,$options:"i"}}:{};

    const count =await Product.countDocuments({...keyword})
    const products=await Product.find({...keyword}).limit(pageSize);

    res.json({
        products,
        page:1, 
        pages: Math.ceil(count / pageSize),
        hasMore:false 
    });


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
    }
});

const fetchProductById = asyncHandler(async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
            if(product){
                res.json(product)
            }
            else{
                res.status(404).json({ error: "Product not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({ error: "Internal Server Error" });
        }
})

const fetchAllProducts=asyncHandler(async (req, res) => {
        try {
            const products=await Product.find({}).populate('category').limit(12).sort({createdAt:-1})
            res.json(products)
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    })

const addProductReview=asyncHandler(async (req, res) => {
    try {
        const product=await Product.findById(req.params.id);
        if(product){
            const alreadyReviewed=product.reviews.find(r=>r.user.toString()==req.user._id.toString())
            if(alreadyReviewed){
                return res.status(400).json({ error: "You have already reviewed this product" });
            }

            const review={
                user: req.user._id,
                name: req.user.username,
                rating: Number(req.body.rating),
                comment: req.body.comment
            }
            product.reviews.push(review);
            product.numReviews=product.reviews.length
            product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

            await product.save();
            res.json({message:"Review added succesfully"})
        }
        else{
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

const fetchTopProducts=asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({rating:-1}).limit(4)
        res.json(products)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


const fetchNewProducts=asyncHandler(async(req,res)=>{
    try {
        const products=await Product.find({}).sort({_id:-1}).limit(6)
        res.json(products)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})



const filterProducts=asyncHandler(async(req,res)=>{
  try {
    
    const {checked,radio}=req.body;

    let args={}

    if(checked.length > 0 ) args.category=checked;
    if(radio.length) args.price={$gte:radio[0],$lte:radio[1]}

    const products=await Product.find(args)
    res.json(products)

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

export {createProduct,updateProduct,deleteProduct,fetchProducts,fetchProductById,fetchAllProducts,addProductReview,
    fetchTopProducts,fetchNewProducts,filterProducts};