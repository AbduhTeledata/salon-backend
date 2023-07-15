import express from "express";
import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} from "../controllers/Orders.js";
import { verifyUser } from "../middleware/AuthUser.js";

const OrderRoute = express.Router();

OrderRoute.get('/orders', verifyUser, getOrders);
OrderRoute.get('/orders/:id', verifyUser, getOrderById);
OrderRoute.post('/orders', verifyUser, createOrder);
OrderRoute.patch('/orders/:id', verifyUser, updateOrder);
OrderRoute.delete('/orders/:id', verifyUser, deleteOrder);

export default OrderRoute;