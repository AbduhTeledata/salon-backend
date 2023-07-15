import express from "express";
import {
    getKeranjangs,
    getKeranjangById,
    createKeranjang,
    updateKeranjang,
    deleteKeranjang
} from "../controllers/Keranjangs.js";
// import { verifyUser } from "../middleware/AuthUser.js";

const KeranjangRoute = express.Router();

KeranjangRoute.get('/keranjangs', getKeranjangs);
KeranjangRoute.get('/keranjangs/:id', getKeranjangById);
KeranjangRoute.post('/keranjangs', createKeranjang);
KeranjangRoute.put('/keranjangs/:id', updateKeranjang);
KeranjangRoute.delete('/keranjangs/:id', deleteKeranjang);

export default KeranjangRoute;