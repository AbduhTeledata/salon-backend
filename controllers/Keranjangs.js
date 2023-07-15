import Users from "../models/UserModel.js";
import {Op} from "sequelize";
// import Products from '../models/ProductModel.js';
import Keranjangs from '../models/KeranjangModel.js';
import ProductSalon from "../models/ProductSalonModel.js";


export const getKeranjangs = async (req, res) =>{
    try {
        let response;
        if(req.role === "Owner"){
            response = await Keranjangs.findAll({
                attributes:['uuid', 'jumlah', 'total_harga'],
                include:[{
                    model: ProductSalon,
                    as: 'productsalon',
                    attributes:['kode', 'name', 'price', 'is_ready', 'gambar']
                }]
            });
        }else{
            response = await Keranjangs.findAll({
                attributes:['uuid', 'jumlah', 'total_harga'],
                include:[{
                    model: ProductSalon,
                    as: 'productsalon',
                    attributes:['kode', 'name', 'price', 'is_ready', 'gambar']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getKeranjangById = async(req, res) =>{
    try {
        const keranjang = await Keranjangs.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!keranjang) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "Owner"){
            response = await Keranjangs.findOne({
                attributes:['uuid', 'jumlah', 'total_harga'],
                include:[{
                    model: ProductSalon,
                    as: 'productsalon',
                    attributes:['kode', 'name', 'price', 'is_ready', 'gambar']
                }]
            });
        }else{
            response = await Keranjangs.findOne({
                attributes:['uuid', 'jumlah', 'total_harga'],
                where:{
                    id: keranjang.id
                },
                include:[{
                    model: ProductSalon,
                    as: 'productsalon',
                    attributes:['kode', 'name', 'price', 'is_ready', 'gambar']
                },
                 
                ]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createKeranjang = async(req, res) =>{
    const {jumlah, total_harga, productsalonId} = req.body;
    try {
        await Keranjangs.create({
            jumlah: jumlah,
            total_harga: total_harga,
            productsalonId: productsalonId
            
        });
        res.status(201).json({msg: "Cart Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateKeranjang = async(req, res) =>{
    try {
        const keranjang = await Keranjangs.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!keranjang) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {jumlah, total_harga, productsalonId} = req.body;
        if(req.role === "Owner"){
            await Keranjangs.update({jumlah, total_harga, productsalonId},{
                where:{
                    id: keranjang.id
                }
            });
        }else{
            if(req.userId !== keranjang.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Orders.update({jumlah, total_harga, productsalonId},{
                where:{
                    id: keranjang.id
                }
            });
        }
        res.status(200).json({msg: "Order updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteKeranjang = async(req, res) =>{
    try {
        const keranjang = await Keranjangs.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!keranjang) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {jumlah, total_harga, productsalonId} = req.body;
        if(req.role === "Owner"){
            await Keranjangs.destroy({
                where:{
                    id: cart.id
                }
            });
        }else{
            if(req.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Keranjangs.destroy({
                where:{
                    id: keranjang.id
                }
            });
        }
        res.status(200).json({msg: "Cart deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}