import express from "express";
import {
    getProductSalons,
    getProductSalonById,
    createProductSalon
} from "../controllers/ProductSalon.js";
// import { verifyUser } from "../middleware/AuthUser.js";

const ProductSalonRoute = express.Router();

ProductSalonRoute.get('/productsalons',  getProductSalons);
ProductSalonRoute.get('/productsalons/:id',  getProductSalonById);
ProductSalonRoute.post('/productsalons',  createProductSalon);
// ProductSalonRoute.patch('/productsalons/:id', verifyUser, updateProduct);
// ProductSalonRoute.delete('/productsalons/:id', verifyUser, deleteProduct);

export default ProductSalonRoute;