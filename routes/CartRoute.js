import express from "express";
import {
    getCarts,
    getCartById,
    createCart
} from "../controllers/Carts.js";
import { verifyUser } from "../middleware/AuthUser.js";

const CartRoute = express.Router();

CartRoute.get('/carts', verifyUser, getCarts);
CartRoute.get('/carts/:id', verifyUser, getCartById);
CartRoute.post('/carts', verifyUser, createCart);
// CartRoute.patch('/carts/:id', verifyUser, updateOrder);
// CartRoute.delete('/carts/:id', verifyUser, deleteCart);

export default CartRoute;