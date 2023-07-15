import express from "express";
import {
    getCategories,
    getCategoryById,
    createCategory
} from "../controllers/Categories.js";
// import { verifyUser } from "../middleware/AuthUser.js";

const CategoryRoute = express.Router();

CategoryRoute.get('/categories',  getCategories);
CategoryRoute.get('/categories/:id',  getCategoryById);
CategoryRoute.post('/categories',  createCategory);
// ProductSalonRoute.patch('/productsalons/:id', verifyUser, updateProduct);
// ProductSalonRoute.delete('/productsalons/:id', verifyUser, deleteProduct);

export default CategoryRoute;