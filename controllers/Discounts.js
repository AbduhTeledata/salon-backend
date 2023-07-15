import Discounts from "../models/DiscountModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getDiscounts = async (req, res) =>{
    try {
        let response;
        if(req.role === "Owner"){
            response = await Discounts.findAll({
                attributes:['uuid', 'name'],
                include:[{
                    model: User,
                    as: 'user',
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Discounts.findAll({
                attributes:['uuid', 'name'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
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

export const getDiscountById = async(req, res) =>{
    try {
        const discount = await Discounts.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!discount) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "Owner"){
            response = await Product.findOne({
                attributes:['uuid', 'name'],
                where:{
                    id: discount.id
                },
                include:[{
                    model: User,
                    as: 'user',
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Discounts.findOne({
                attributes:['uuid', 'name'],
                where:{
                    [Op.and]:[{id: discount.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
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

export const createDiscount = async(req, res) =>{
    const {name} = req.body;
    try {
        await Discounts.create({
            name: name,
            userId: req.userId
        });
        res.status(201).json({msg: "Data Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateDiscount = async(req, res) =>{
    try {
        const discount = await Discounts.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!discount) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name} = req.body;
        if(req.role === "Owner"){
            await Discounts.update({name},{
                where:{
                    id: discount.id
                }
            });
        }else{
            if(req.userId !== discount.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Discount.update({name},{
                where:{
                    [Op.and]:[{id: discount.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteDiscount = async(req, res) =>{
    try {
        const discount = await Discounts.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!discount) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name} = req.body;
        if(req.role === "Owner"){
            await Discounts.destroy({
                where:{
                    id: discount.id
                }
            });
        }else{
            if(req.userId !== discount.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Discounts.destroy({
                where:{
                    [Op.and]:[{id: discount.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}