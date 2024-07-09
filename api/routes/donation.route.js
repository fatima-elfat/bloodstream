import express from "express";
import {
    addDonation,
    getDonations,
    getDonation,
    updateDonation,
    deleteDonation
} from "../controllers/donation.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/add", verifyToken, addDonation);
router.get("/", getDonations);
router.get("/donation/:id", verifyToken, getDonation);
router.put("/:id", verifyToken, updateDonation);
router.delete("/:id", verifyToken, deleteDonation);
export default router;
