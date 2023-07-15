import express from "express";
import {
    getCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
} from "../controllers/Companies.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const CompanyRoute = express.Router();

CompanyRoute.get('/companies', verifyUser, adminOnly, getCompanies);
CompanyRoute.get('/companies/:id', verifyUser, adminOnly, getCompanyById);
CompanyRoute.post('/companies',  verifyUser, adminOnly, createCompany);
CompanyRoute.patch('/companies/:id', verifyUser, adminOnly, updateCompany);
CompanyRoute.delete('/companies/:id', verifyUser, adminOnly, deleteCompany);

export default CompanyRoute;