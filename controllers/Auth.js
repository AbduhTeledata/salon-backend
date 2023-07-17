import User from "../models/UserModel.js";
import argon2 from "argon2";
import Branches from "../models/BranchModel.js";

export const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Password Salah"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    const branchId = user.branchId;
    res.status(200).json({ uuid, name, email, role, branchId});
}

export const Me = async(req, res) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun anda"});
    }
    const user = await User.findOne({
        attributes: ['uuid', 'name', 'email', 'role', 'branchId'],
        where: {
            uuid: req.session.userId
        },
        include: [
            {
                model: Branches,
                as: 'branch',
                attributes: ['id', 'name', 'address', 'phone']
            }],
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}