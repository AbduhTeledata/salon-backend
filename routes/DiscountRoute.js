import express from "express";
import {
    getDiscounts,
    getDiscountById,
    createDiscount,
    updateDiscount,
    deleteDiscount
} from "../controllers/Discounts.js";
import { verifyUser } from "../middleware/AuthUser.js";

const DiscountRoute = express.Router();

DiscountRoute.get('/discounts', verifyUser, getDiscounts);
DiscountRoute.get('/discounts/:id', verifyUser, getDiscountById);
DiscountRoute.post('/discounts', verifyUser, createDiscount);
DiscountRoute.patch('/discounts/:id', verifyUser, updateDiscount);
DiscountRoute.delete('/discounts/:id', verifyUser, deleteDiscount);

export default DiscountRoute;