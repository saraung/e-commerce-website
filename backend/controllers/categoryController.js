import asyncHandler from "../middlewares/asyncHandler.js";
import Category from '../models/categoryModel.js'

const createCategory=asyncHandler(async(req,res)=>{
    try {
        const {name}=req.body;
        if(!name)
        {
            return res.json({error:"Name is required"});
        }

        const existingCategory = await Category.findOne({name}) 
        if(existingCategory){
            return res.json({error:"Category already exists"});
        }

        const category=await new Category({name}).save();
        res.status(201).json({
            status: "success",
            data:category
        });

    } catch (error) {
        console.error(error)
        return res.status(404).json(error);
    }
})


const updateCategory = asyncHandler(async(req,res)=>{
    try {
        const {name}=req.body;
        const {categoryId}=req.params

        const category=await Category.findOne({_id: categoryId})
        if(!category){
            return res.status(404).json({error:"Category not found"});
        }
        else{
            category.name=name;
            await category.save();
            res.json(`Category updated: ${category}`); 
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message});
    }
})

const deleteCategory = asyncHandler(async(req,res)=>{
    try {
        const {categoryId}=req.params
        const removed=await Category.findByIdAndDelete({_id: categoryId});
        if(!removed){
            return res.status(404).json({error:"Category not found"});
        }
        else{
            res.json(`Category deleted: ${categoryId}`); 
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message});
    }
})


const listCategories= asyncHandler(async(req,res)=>{
        try {
            const categories=await Category.find({});
            res.json(categories);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message});
        }
    
})


const readCategory= asyncHandler(async(req,res)=>{
    try {
        const {id}=req.params
        const category=await Category.findById({_id:id});
        if(!category){
            return res.status(404).json({error:"Category not found"});
        }
        else{
            res.json(category);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message});
    }
 })


export  {createCategory,updateCategory,deleteCategory,listCategories,readCategory};