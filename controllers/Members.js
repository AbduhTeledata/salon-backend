import Members from "../models/MemberModel.js";
import User from "../models/UserModel.js";
import Branches from "../models/BranchModel.js";
import {Op} from "sequelize";

export const getMembers = async (req, res) =>{
    try {
        let response;
        if(req.role === "Owner"){
            response = await Members.findAll({
                attributes:['uuid', 'membercode', 'name','gender', 'address', 'placebirth', 'datebirth', 'phone', 'code'],
                include:[{
                    model: Branches,
                    as: 'branch',
                    attributes:['name','address', 'phone']
                },
                {
                    model: User,
                    as: 'user',
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Members.findAll({
                attributes:['uuid', 'membercode', 'name','gender', 'address', 'placebirth', 'datebirth', 'phone', 'code'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: Branches,
                    as: 'branch',
                    attributes:['name','address', 'phone']
                },
                {
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

export const getMemberById = async(req, res) =>{
    try {
        const member = await Members.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!member) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "Owner"){
            response = await Members.findOne({
                attributes:['uuid', 'membercode', 'name','gender', 'address', 'placebirth', 'datebirth', 'phone', 'code'],
                where:{
                    id: member.id
                },
                include:[{
                    model: Branches,
                    as: 'branch',
                    attributes:['name','address', 'phone']
                },
                {
                    model: User,
                    as: 'user',
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Members.findOne({
                attributes:['uuid', 'membercode', 'name','gender', 'address', 'placebirth', 'datebirth', 'phone', 'code'],
                where:{
                    [Op.and]:[{id: member.id}, {userId: req.userId}]
                },
                include:[{
                    model: Branches,
                    as: 'branch',
                    attributes:['name','address', 'phone']
                },
                {
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

export const createMember = async(req, res) =>{
    const {membercode, name, gender, address, placebirth, datebirth, phone, code, branchId} = req.body;
    try {
        await Members.create({
            membercode: membercode,
            name: name,
            gender: gender,
            address, address,
            placebirth: placebirth,
            datebirth: datebirth,
            phone: phone,
            code: code,
            branchId: branchId,
            userId: req.userId
        });
        res.status(201).json({msg: "Data Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateMember = async(req, res) =>{
    try {
        const member = await Members.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!member) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {membercode, name, gender, address, placebirth, datebirth, phone, code, branchId} = req.body;
        if(req.role === "Owner"){
            await Members.update({code},{
                where:{
                    id: member.id
                }
            });
        }else{
            if(req.userId !== member.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Members.update({membercode, name, gender, address, placebirth, datebirth, phone, code, branchId},{
                where:{
                    [Op.and]:[{id: member.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteMember = async(req, res) =>{
    try {
        const member = await Members.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!member) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {membercode, name, gender, address, placebirth, datebirth, phone, code} = req.body;
        if(req.role === "Owner"){
            await Members.destroy({
                where:{
                    id: member.id
                }
            });
        }else{
            if(req.userId !== member.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Members.destroy({
                where:{
                    [Op.and]:[{id: member.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}