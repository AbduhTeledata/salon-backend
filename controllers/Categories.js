import Categories from "../models/CategoryModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getCategories = async (req, res) =>{
    try {
        let response;
        if(req.role === "Owner"){
            response = await Categories.findAll({
                attributes:['uuid', 'name']
            });
        }else{
            response = await Categories.findAll({
                attributes:['uuid', 'name']
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getCategoryById = async(req, res) =>{
    try {
        const category = await Categories.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!category) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "Owner"){
            response = await Categories.findOne({
                attributes:['uuid', 'name'],
                where:{
                    id: category.id
                }
            });
        }else{
            response = await Categories.findOne({
                attributes:['uuid', 'name'],
                where:{
                    id: category.id
                }
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createCategory = async(req, res) =>{
    const {name} = req.body;
    try {
        await Categories.create({
            name: name
        });
        res.status(201).json({msg: "Data Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// export const updateProduct = async(req, res) =>{
//     try {
//         const product = await Product.findOne({
//             where:{
//                 uuid: req.params.id
//             }
//         });
//         if(!product) return res.status(404).json({msg: "Data tidak ditemukan"});
//         const {name, price} = req.body;
//         if(req.role === "Owner"){
//             await Product.update({name, price},{
//                 where:{
//                     id: product.id
//                 }
//             });
//         }else{
//             if(req.userId !== product.userId) return res.status(403).json({msg: "Akses terlarang"});
//             await Product.update({name, price},{
//                 where:{
//                     [Op.and]:[{id: product.id}, {userId: req.userId}]
//                 }
//             });
//         }
//         res.status(200).json({msg: "Data updated successfuly"});
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }

// export const deleteProduct = async(req, res) =>{
//     try {
//         const product = await Product.findOne({
//             where:{
//                 uuid: req.params.id
//             }
//         });
//         if(!product) return res.status(404).json({msg: "Data tidak ditemukan"});
//         const {name, price} = req.body;
//         if(req.role === "Owner"){
//             await Product.destroy({
//                 where:{
//                     id: product.id
//                 }
//             });
//         }else{
//             if(req.userId !== product.userId) return res.status(403).json({msg: "Akses terlarang"});
//             await Product.destroy({
//                 where:{
//                     [Op.and]:[{id: product.id}, {userId: req.userId}]
//                 }
//             });
//         }
//         res.status(200).json({msg: "Data deleted successfuly"});
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }