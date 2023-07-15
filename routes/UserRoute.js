import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/Users.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const UserRoute = express.Router();

UserRoute.get('/users', verifyUser, adminOnly, getUsers);
UserRoute.get('/users/:id', verifyUser, getUserById);
UserRoute.post('/users',    verifyUser, adminOnly, createUser);
UserRoute.patch('/users/:id', verifyUser, adminOnly, updateUser);
UserRoute.delete('/users/:id', verifyUser, adminOnly, deleteUser);

export default UserRoute;