import Branches from "../models/BranchModel.js";
import Companies from "../models/CompanyModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getBranches = async (req, res) =>{
    try {
        let response;
        if(req.role === "Owner"){
            response = await Branches.findAll({
                attributes:['id', 'uuid', 'name', 'address','phone'],
                include:[
                {
                    model: Companies,
                    as: 'company',
                    attributes:['name','address', 'phone']
                },
                // {
                //     model: User,
                //     as: 'user',
                //     attributes:['name','email']
                // }
            ]
            });
        }else{
            response = await Branches.findAll({
                attributes:['id', 'uuid', 'name', 'address','phone'],
                where:{
                    userId: req.userId
                },
                include:[
                    {
                        model: Companies,
                        as: 'company',
                        attributes:['name','address', 'phone']
                    },
                    // {
                    //     model: User,
                    //     as: 'user',
                    //     attributes:['name','email']
                    // }
                ]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getBranchById = async(req, res) =>{
    try {
        const branch = await Branches.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!branch) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "Owner"){
            response = await Branches.findOne({
                attributes:['id', 'uuid', 'name', 'address','phone'],
                where:{
                    id: branch.id
                },
                include:[
                    {
                        model: Companies,
                        as: 'company',
                        attributes:['name','address', 'phone']
                    },
                    // {
                    //     model: User,
                    //     as: 'user',
                    //     attributes:['name','email']
                    // }
                ]
            });
        }else{
            response = await Branches.findOne({
                attributes:['id', 'uuid', 'name', 'address','phone'],
                where:{
                    [Op.and]:[{id: branch.id}, {userId: req.userId}]
                },
                include:[
                    {
                        model: Companies,
                        as: 'company',
                        attributes:['name','address', 'phone']
                    },
                    // {
                    //     model: User,
                    //     as: 'user',
                    //     attributes:['name','email']
                    // }
                ]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createBranch = async(req, res) =>{
    const {name, address, phone, companyId} = req.body;
    try {
        await Branches.create({
            name: name,
            address: address,
            phone: phone,
            companyId: companyId,
            userId: req.userId
        });
        res.status(201).json({msg: "Data Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateBranch = async(req, res) =>{
    try {
        const branch = await Branches.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!branch) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name, address, phone, companyId} = req.body;
        if(req.role === "Owner"){
            await Branches.update({name, address, phone, companyId},{
                where:{
                    id: branch.id
                }
            });
        }else{
            if(req.userId !== branch.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Branches.update({name, address, phone, companyId},{
                where:{
                    [Op.and]:[{id: branch.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteBranch = async(req, res) =>{
    try {
        const branch = await Branches.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!branch) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name, address, phone} = req.body;
        if(req.role === "Owner"){
            await Branches.destroy({
                where:{
                    id: branch.id
                }
            });
        }else{
            if(req.userId !== branch.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Branches.destroy({
                where:{
                    [Op.and]:[{id: branch.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}