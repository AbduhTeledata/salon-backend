import Branches from "../models/BranchModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";
import Employees from "../models/EmployeeModel.js";

export const getEmployees = async (req, res) =>{
    try {
        let response;
        if(req.role === "Owner"){
            response = await Employees.findAll({
                attributes:['id', 'uuid', 'name', 'address','phone', 'position'],
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
            response = await Employees.findAll({
                attributes:['id', 'uuid', 'name', 'address','phone', 'position'],
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

export const getEmployeeById = async(req, res) =>{
    try {
        const employee = await Employees.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!employee) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "Owner"){
            response = await Employees.findOne({
                attributes:['id', 'uuid', 'name', 'address','phone', 'position'],
                where:{
                    id: employee.id
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
            response = await Employees.findOne({
                attributes:['id', 'uuid', 'name', 'address','phone', 'position'],
                where:{
                    [Op.and]:[{id: employee.id}, {userId: req.userId}]
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

export const createEmployee = async(req, res) =>{
    const {name, address, phone, position, branchId} = req.body;
    try {
        await Employees.create({
            name: name,
            address: address,
            phone: phone,
            position: position,
            branchId: branchId,
            userId: req.userId
        });
        res.status(201).json({msg: "Data Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateEmployee = async(req, res) =>{
    try {
        const employee = await Employees.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!employee) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name, address, phone, position, branchId} = req.body;
        if(req.role === "Owner"){
            await Employees.update({name, address, phone, position, branchId},{
                where:{
                    id: employee.id
                }
            });
        }else{
            if(req.userId !== employee.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Employees.update({name, address, phone, position, branchId},{
                where:{
                    [Op.and]:[{id: employee.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteEmployee = async(req, res) =>{
    try {
        const employee = await Employees.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!employee) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name, address, phone, position} = req.body;
        if(req.role === "Owner"){
            await Employees.destroy({
                where:{
                    id: employee.id
                }
            });
        }else{
            if(req.userId !== employee.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Employees.destroy({
                where:{
                    [Op.and]:[{id: employee.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}