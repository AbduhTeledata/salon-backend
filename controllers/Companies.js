import Companies from "../models/CompanyModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getCompanies = async (req, res) =>{
    try {
        let response;
        if(req.role === "Owner"){
            response = await Companies.findAll({
                attributes:['uuid', 'name', 'address','phone'],
                // include:[{
                //     model: User,
                //     as: 'user',
                //     attributes:['name', 'email']
                // }]
            });
        }else{
            response = await Companies.findAll({
                attributes:['uuid', 'name', 'address','phone'],
                where:{
                    userId: req.userId
                },
                // include:[{
                //     model: User,
                //     as: 'user',
                //     attributes:['name','email']
                // }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getCompanyById = async(req, res) =>{
    try {
        const company = await Companies.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!company) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "Owner"){
            response = await Companies.findOne({
                attributes:['uuid', 'name', 'address','phone'],
                where:{
                    id: company.id
                },
                // include:[{
                //     model: User,
                //     as: 'user',
                //     attributes:['name','email']
                // }]
            });
        }else{
            response = await Companies.findOne({
                attributes:['uuid', 'name', 'address','phone'],
                where:{
                    [Op.and]:[{id: company.id}, {userId: req.userId}]
                },
                // include:[{
                //     model: User,
                //     as: 'user',
                //     attributes:['name','email']
                // }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createCompany = async(req, res) =>{
    const {name, address, phone} = req.body;
    try {
        await Companies.create({
            name: name,
            address: address,
            phone: phone,
            // userId: req.userId
        });
        res.status(201).json({msg: "Data Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateCompany = async(req, res) =>{
    try {
        const company = await Companies.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!company) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name, address, phone} = req.body;
        if(req.role === "Owner"){
            await Companies.update({name, address, phone},{
                where:{
                    id: company.id
                }
            });
        }else{
            if(req.userId !== company.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Companies.update({name, address, phone},{
                where:{
                    [Op.and]:[{id: company.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteCompany = async(req, res) =>{
    try {
        const company = await company.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!company) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name, address, phone} = req.body;
        if(req.role === "Owner"){
            await Companies.destroy({
                where:{
                    id: company.id
                }
            });
        }else{
            if(req.userId !== company.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Companies.destroy({
                where:{
                    [Op.and]:[{id: company.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}