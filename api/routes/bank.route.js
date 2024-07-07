import express from "express";
import {
    addBank,
    getBanks,
    getBank,
    updateBank,
    deleteBank
} from "../controllers/bank.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/add", verifyToken, addBank);
router.get("/", getBanks);
router.get("/bank/:id", verifyToken, getBank);
router.put("/:id", verifyToken, updateBank);
router.delete("/:id", verifyToken, deleteBank);
export default router;
