import express from "express";
import {
    getBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
} from "../controllers/Branches.js";
import { verifyUser } from "../middleware/AuthUser.js";

const BranchRoute = express.Router();

BranchRoute.get('/branches', verifyUser, getBranches);
BranchRoute.get('/branches/:id', verifyUser, getBranchById);
BranchRoute.post('/branches',   verifyUser, createBranch);
BranchRoute.patch('/branches/:id', verifyUser, updateBranch);
BranchRoute.delete('/branches/:id', verifyUser, deleteBranch);

export default BranchRoute;