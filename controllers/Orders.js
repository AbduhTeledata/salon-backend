import Orders from '../models/OrderModel.js';
import Employees from '../models/EmployeeModel.js';
import Users from "../models/UserModel.js";
import {Op} from "sequelize";
import Members from '../models/MemberModel.js';
import Branches from '../models/BranchModel.js';
import Products from '../models/ProductModel.js';
import Discounts from '../models/DiscountModel.js';

export const getOrders = async (req, res) =>{
    try {
        let response;
        if(req.role === "Owner"){
            response = await Orders.findAll({
                attributes:['uuid','inv_code', 'qty', 'sub_total', 'total_disc', 'taxes', 'total_price',  'kodemember', 'iscard', 'note', 'terapis', 'createdAt'],
                include:[{
                    model: Products,
                    as: 'product',
                    attributes:['name', 'price']
                },
     
                {
                    model: Branches,
                    as: 'branch',
                    attributes:['name', 'address', 'phone']
                }, 
                {
                    model: Users,
                    as: 'user',
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Orders.findAll({
                attributes:['uuid','inv_code', 'qty', 'sub_total', 'total_disc', 'taxes', 'total_price',  'kodemember', 'iscard', 'note', 'terapis','createdAt'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: Products,
                    as: 'product',
                    attributes:['name', 'price']
                },
                 
                {
                    model: Branches,
                    as: 'branch',
                    attributes:['name', 'address', 'phone']
                }, 
                {
                    model: Users,
                    as: 'user',
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getOrderById = async(req, res) =>{
    try {
        const order = await Orders.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!order) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "Owner"){
            response = await Orders.findOne({
                attributes:['uuid','inv_code', 'qty', 'sub_total', 'total_disc', 'taxes', 'total_price',  'kodemember', 'iscard', 'note', 'terapis','createdAt'],
                where:{
                    id: order.id
                },
                include:[{
                    model: Products,
                    as: 'product',
                    attributes:['name', 'price']
                },
               
                {
                    model: Branches,
                    as: 'branch',
                    attributes:['name', 'address', 'phone']
                }, 
                {
                    model: Users,
                    as: 'user',
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Orders.findOne({
                attributes:['uuid','inv_code', 'qty', 'sub_total', 'total_disc', 'taxes', 'total_price',  'kodemember', 'iscard', 'terapis', 'note', 'createdAt'],
                where:{
                    [Op.and]:[{id: order.id}, {userId: req.userId}]
                },
                include:[{
                    model: Products,
                    as: 'product',
                    attributes:['name', 'price']
                },
                
                {
                    model: Branches,
                    as: 'branch',
                    attributes:['name', 'address', 'phone']
                }, 
                {
                    model: Users,
                    as: 'user',
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createOrder = async(req, res) =>{
    const {inv_code, qty, sub_total, total_disc, taxes, total_price, kodemember, iscard, note, terapis, productId, memberId, branchId} = req.body;
    try {
        await Orders.create({
            inv_code: inv_code,
            qty: qty,
            sub_total: sub_total,
            total_disc: total_disc,
            taxes: taxes,
            total_price: total_price,
            kodemember: kodemember,
            iscard: iscard,
            note: note,
            terapis: terapis,
            productId: productId,
            branchId: branchId,
            userId: req.userId,
            
        });
        res.status(201).json({msg: "Order Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateOrder = async(req, res) =>{
    try {
        const order = await Orders.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!order) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {inv_code, qty, sub_total, total_disc, taxes, total_price, kodemember, iscard, note, terapis, productId, memberId, branchId} = req.body;
        if(req.role === "Owner"){
            await Orders.update({inv_code, qty, sub_total, total_disc, taxes, total_price, kodemember, iscard, note, terapis, productId, memberId, branchId},{
                where:{
                    id: order.id
                }
            });
        }else{
            if(req.userId !== order.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Orders.update({inv_code, qty, sub_total, total_disc, taxes, total_price, kodemember, iscard, note, terapis, productId, memberId, branchId},{
                where:{
                    [Op.and]:[{id: order.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Order updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteOrder = async(req, res) =>{
    try {
        const order = await Orders.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!order) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {inv_code, qty, sub_total, total_disc, taxes, total_price, kodemember, iscard, note, terapis, productId,  branchId} = req.body;
        if(req.role === "Owner"){
            await Orders.destroy({
                where:{
                    id: order.id
                }
            });
        }else{
            if(req.userId !== order.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Orders.destroy({
                where:{
                    [Op.and]:[{id: order.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Order deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}