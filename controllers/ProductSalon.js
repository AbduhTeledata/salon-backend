import Categories from "../models/CategoryModel.js";
import ProductSalon from "../models/ProductSalonModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";


export const getProductSalons = async (req, res) =>{
    try {
        let response;
        if(req.role === "Owner"){
            response = await ProductSalon.findAll({
                attributes:['uuid', 'kode', 'name','price', 'is_ready', 'gambar'],
                include:[
                {
                    model: Categories,
                    as: 'category',
                    attributes:['name']
                }]
            });
        }else{
            response = await ProductSalon.findAll({
                attributes:['uuid', 'kode', 'name','price', 'is_ready', 'gambar'],
                include:[{
                    model: Categories,
                    as: 'category',
                    attributes:['name']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getProductSalonById = async(req, res) =>{
    try {
        const productsalon = await ProductSalon.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!productsalon) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "Owner"){
            response = await ProductSalon.findOne({
                attributes:['uuid', 'kode', 'name','price', 'is_ready', 'gambar'],
                where:{
                    id: productsalon.id
                },
                include:[{
                    model: Categories,
                    as: 'category',
                    attributes:['name']
                }]
            });
        }else{
            response = await ProductSalon.findOne({
                attributes:['uuid', 'kode', 'name','price', 'is_ready', 'gambar'],
                where:{
                    id: productsalon.id
                },
                include:[
                {
                    model: Categories,
                    as: 'category',
                    attributes:['name']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createProductSalon = async(req, res) =>{
    const {kode, name, price, is_ready, gambar, categoryId} = req.body;
    try {
        await ProductSalon.create({
            kode: kode,
            name: name,
            price: price,
            is_ready: is_ready,
            gambar: gambar,
            categoryId: categoryId
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