import express from 'express';
import { authenticate,authorizeAdmin } from '../middlewares/authMiddleware.js';
import {createCategory, deleteCategory, updateCategory,listCategories,readCategory} from '../controllers/categoryController.js'

const  router= express.Router();


router.route("/").post(authenticate,authorizeAdmin,createCategory);
router.route("/:categoryId").put(authenticate,authorizeAdmin,updateCategory)
.delete(authenticate,authorizeAdmin,deleteCategory)

router.route("/categories").get(listCategories)
router.route("/:id").get(readCategory)

export default router;
