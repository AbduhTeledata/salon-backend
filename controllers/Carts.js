import Users from "../models/UserModel.js";
import {Op} from "sequelize";
// import Products from '../models/ProductModel.js';
import Carts from '../models/CartModel.js';
import ProductSalon from "../models/ProductSalonModel.js";


export const getCarts = async (req, res) =>{
    try {
        let response;
        if(req.role === "Owner"){
            response = await Carts.findAll({
                attributes:['uuid', 'qty', 'sub_total'],
                include:[{
                    model: ProductSalon,
                    as: 'productsalon',
                    attributes:['name', 'price']
                },
                {
                    model: Users,
                    as: 'user',
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Carts.findAll({
                attributes:['uuid', 'qty', 'sub_total'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: ProductSalon,
                    as: 'productsalon',
                    attributes:['name', 'price']
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

export const getCartById = async(req, res) =>{
    try {
        const cart = await Carts.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!cart) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "Owner"){
            response = await Carts.findOne({
                attributes:['uuid', 'qty', 'sub_total'],
                where:{
                    id: cart.id
                },
                include:[{
                    model: ProductSalon,
                    as: 'productsalon',
                    attributes:['name', 'price']
                },
                {
                    model: Users,
                    as: 'user',
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Carts.findOne({
                attributes:['uuid','qty', 'sub_total'],
                where:{
                    [Op.and]:[{id: cart.id}, {userId: req.userId}]
                },
                include:[{
                    model: ProductSalon,
                    as: 'productsalon',
                    attributes:['name', 'price']
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

export const createCart = async(req, res) =>{
    const {qty, sub_total, productsalonId} = req.body;
    try {
        await Carts.create({
            qty: qty,
            sub_total: sub_total,
            productsalonId: productsalonId,
            userId: req.userId
            
        });
        res.status(201).json({msg: "Cart Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// export const updateOrder = async(req, res) =>{
//     try {
//         const order = await Orders.findOne({
//             where:{
//                 uuid: req.params.id
//             }
//         });
//         if(!order) return res.status(404).json({msg: "Data tidak ditemukan"});
//         const {inv_code, qty, sub_total, total_disc, taxes, total_price, iscard, productId, discountId, memberId, employeeId, branchId} = req.body;
//         if(req.role === "Owner"){
//             await Orders.update({inv_code, qty, sub_total, total_disc, taxes, total_price, iscard, productId, discountId, memberId, employeeId, branchId},{
//                 where:{
//                     id: order.id
//                 }
//             });
//         }else{
//             if(req.userId !== order.userId) return res.status(403).json({msg: "Akses terlarang"});
//             await Orders.update({inv_code, qty, sub_total, total_disc, taxes, total_price, iscard, productId, discountId, memberId, employeeId, branchId},{
//                 where:{
//                     [Op.and]:[{id: order.id}, {userId: req.userId}]
//                 }
//             });
//         }
//         res.status(200).json({msg: "Order updated successfuly"});
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }

// export const deleteCart = async(req, res) =>{
//     try {
//         const cart = await Carts.findOne({
//             where:{
//                 uuid: req.params.id
//             }
//         });
//         if(!cart) return res.status(404).json({msg: "Data tidak ditemukan"});
//         const {qty, sub_total} = req.body;
//         if(req.role === "Owner"){
//             await Orders.destroy({
//                 where:{
//                     id: cart.id
//                 }
//             });
//         }else{
//             if(req.userId !== cart.userId) return res.status(403).json({msg: "Akses terlarang"});
//             await Orders.destroy({
//                 where:{
//                     [Op.and]:[{id: cart.id}, {userId: req.userId}]
//                 }
//             });
//         }
//         res.status(200).json({msg: "Cart deleted successfuly"});
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }