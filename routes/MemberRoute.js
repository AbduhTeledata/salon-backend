import express from "express";
import {
    getMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
} from "../controllers/Members.js";
import { verifyUser } from "../middleware/AuthUser.js";

const MemberRoute = express.Router();

MemberRoute.get('/members', verifyUser, getMembers);
MemberRoute.get('/members/:id', verifyUser, getMemberById);
MemberRoute.post('/members', verifyUser, createMember);
MemberRoute.patch('/members/:id', verifyUser, updateMember);
MemberRoute.delete('/members/:id', verifyUser, deleteMember);

export default MemberRoute;