import express from "express";
import {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../controllers/Employees.js";
import { verifyUser } from "../middleware/AuthUser.js";

const EmployeeRoute = express.Router();

EmployeeRoute.get('/employees', verifyUser, getEmployees);
EmployeeRoute.get('/employees/:id', verifyUser, getEmployeeById);
EmployeeRoute.post('/employees', verifyUser, createEmployee);
EmployeeRoute.patch('/employees/:id', verifyUser, updateEmployee);
EmployeeRoute.delete('/employees/:id', verifyUser, deleteEmployee);

export default EmployeeRoute;