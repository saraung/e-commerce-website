import express from 'express';
import { authenticate,authorizeAdmin } from '../middlewares/authMiddleware.js';
import formidable from "express-formidable";
import {createProduct,updateProduct,
     deleteProduct,
     fetchProducts,
     fetchProductById,
     fetchAllProducts,
     addProductReview,
     fetchTopProducts,
     fetchNewProducts,
     filterProducts
    } from '../controllers/productController.js'
import checkId from '../middlewares/checkId.js';

// router.use('/products', checkId);
const  router= express.Router();

router.route('/allproducts').get(fetchAllProducts)

router.route('/top').get(fetchTopProducts)
router.route('/new').get(fetchNewProducts)

router.route('/').get(fetchProducts).post(authenticate,authorizeAdmin,formidable(),createProduct);
router.route('/:id').put(authenticate,authorizeAdmin,formidable(),updateProduct)
.delete(authenticate,authorizeAdmin,deleteProduct).get(fetchProductById);


router.route('/:id/reviews').post(authenticate,checkId,addProductReview)


router.route('/filtered-products').post(filterProducts)

export default router;
