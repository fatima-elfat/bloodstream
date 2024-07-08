import express from "express";
import {
    addDonor,
    getDonors,
    getDonor,
    updateDonor,
    deleteDonor
} from "../controllers/donor.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/add/:id", verifyToken, addDonor);
router.get("/", getDonors);
router.get("/donor/:id", verifyToken, getDonor);
router.put("/:id", verifyToken, updateDonor);
router.delete("/:id", verifyToken, deleteDonor);
export default router;
