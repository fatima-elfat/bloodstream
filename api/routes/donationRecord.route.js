import express from "express";
import {
    addDonationRecord,
    getDonationRecords,
    getDonationRecord,
    updateDonationRecord,
    deleteDonationRecord
} from "../controllers/donationRecord.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/add/:id", verifyToken, addDonationRecord);
router.get("/", getDonationRecords);
router.get("/donationRecord/:id", verifyToken, getDonationRecord);
router.put("/:id", verifyToken, updateDonationRecord);
router.delete("/:id", verifyToken, deleteDonationRecord);
export default router;
