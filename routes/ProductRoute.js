import express from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/Products.js";
import { verifyUser } from "../middleware/AuthUser.js";

const ProductRoute = express.Router();

ProductRoute.get('/products', verifyUser, getProducts);
ProductRoute.get('/products/:id', verifyUser, getProductById);
ProductRoute.post('/products', verifyUser, createProduct);
ProductRoute.patch('/products/:id', verifyUser, updateProduct);
ProductRoute.delete('/products/:id', verifyUser, deleteProduct);

export default ProductRoute;