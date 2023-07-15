import OrderDetails from '../models/OrderDetailModel.js';
import Orders from '../models/OrderModel.js';
import Products from '../models/ProductModel.js';
import User from "../models/UserModel.js";
import {Op} from "sequelize";
import Discounts from '../models/DiscountModel.js';

export const getOrderDetails = async (req, res) =>{
    try {
        let response;
        if(req.role === "Owner"){
            response = await OrderDetails.findAll({
                attributes:['uuid','qty', 'sub_total','total_disc', 'total_price'],
                include:[{
                    model: User,
                    as: 'user',
                    attributes:['name','email']
                }],
                include:[{
                    model: Products,
                    as: 'product',
                    attributes:['name','price']
                }],
                include:[{
                    model: Discounts,
                    as: 'discount',
                    attributes:['name']
                }],
                include:[{
                    model: Orders,
                    as: 'order',
                    attributes:['inv_code', 'iscard']
                }]
            });
        }else{
            response = await OrderDetails.findAll({
                attributes:['uuid','qty', 'sub_total','total_disc', 'total_price'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    as: 'user',
                    attributes:['name','email']
                }],
                include:[{
                    model: Products,
                    as: 'product',
                    attributes:['name','price']
                }],
                include:[{
                    model: Discounts,
                    as: 'discount',
                    attributes:['name']
                }],
                include:[{
                    model: Orders,
                    as: 'order',
                    attributes:['inv_code', 'iscard']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getOrderDetailById = async(req, res) =>{
    try {
        const orderdetail = await OrderDetails.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!orderdetail) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "Owner"){
            response = await OrderDetails.findOne({
                attributes:['uuid','qty', 'sub_total','total_disc', 'total_price'],
                where:{
                    id: orderdetail.id
                },
                include:[{
                    model: User,
                    as: 'user',
                    attributes:['name','email']
                }],
                include:[{
                    model: Products,
                    as: 'product',
                    attributes:['name','price']
                }],
                include:[{
                    model: Discounts,
                    as: 'discount',
                    attributes:['name']
                }],
                include:[{
                    model: Orders,
                    as: 'order',
                    attributes:['inv_code', 'iscard']
                }]
            });
        }else{
            response = await OrderDetails.findOne({
                attributes:['uuid','qty', 'sub_total','total_disc', 'total_price'],
                where:{
                    [Op.and]:[{id: orderdetail.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    as: 'user',
                    attributes:['name','email']
                }],
                include:[{
                    model: Products,
                    as: 'product',
                    attributes:['name','price']
                }],
                include:[{
                    model: Discounts,
                    as: 'discount',
                    attributes:['name']
                }],
                include:[{
                    model: Orders,
                    as: 'order',
                    attributes:['inv_code', 'iscard']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createOrderDetail = async(req, res) =>{
    const {qty, sub_total, total_disc, total_price, productId, discountId, orderId} = req.body;
    try {
        await OrderDetails.create({
            qty: qty,
            sub_total: sub_total,
            total_disc: total_disc,
            total_price: total_price,
            productId: productId,
            discountId: discountId,
            orderId: orderId,
            userId: req.userId,
            
        });
        res.status(201).json({msg: "OrderDetail Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateOrderDetail = async(req, res) =>{
    try {
        const orderdetail = await OrderDetails.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!orderdetail) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {qty, sub_total, total_disc, total_price} = req.body;
        if(req.role === "Owner"){
            await OrderDetails.update({qty, sub_total, total_disc, total_price},{
                where:{
                    id: orderdetail.id
                }
            });
        }else{
            if(req.userId !== orderdetail.userId) return res.status(403).json({msg: "Akses terlarang"});
            await OrderDetails.update({qty, sub_total, total_disc, total_price},{
                where:{
                    [Op.and]:[{id: orderdetail.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "OrderDetail updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteOrderDetail = async(req, res) =>{
    try {
        const orderdetail = await OrderDetails.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!orderdetail) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {qty, sub_total, total_disc, total_price} = req.body;
        if(req.role === "Owner"){
            await OrderDetails.destroy({
                where:{
                    id: orderdetail.id
                }
            });
        }else{
            if(req.userId !== orderdetail.userId) return res.status(403).json({msg: "Akses terlarang"});
            await OrderDetails.destroy({
                where:{
                    [Op.and]:[{id: orderdetail.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "OrderDetail deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}