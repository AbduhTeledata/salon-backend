import express from "express";
import {
    getOrderDetails,
    getOrderDetailById,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
} from "../controllers/OrderDetails.js";
import { verifyUser } from "../middleware/AuthUser.js";

const OrderDetailRoute = express.Router();

OrderDetailRoute.get('/orderdetails', verifyUser, getOrderDetails);
OrderDetailRoute.get('/orderdetails/:id', verifyUser, getOrderDetailById);
OrderDetailRoute.post('/orderdetails', verifyUser, createOrderDetail);
OrderDetailRoute.patch('/orderdetails/:id', verifyUser, updateOrderDetail);
OrderDetailRoute.delete('/orderdetails/:id', verifyUser, deleteOrderDetail);

export default OrderDetailRoute;