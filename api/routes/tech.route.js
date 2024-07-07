import express from "express";
import {
    addTech,
    getTechs,
    getTech,
    updateTech,
    deleteTech
} from "../controllers/tech.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/add/:id", verifyToken, addTech);
router.get("/", getTechs);
router.get("/tech/:id", verifyToken, getTech);
router.put("/:id", verifyToken, updateTech);
router.delete("/:id", verifyToken, deleteTech);
export default router;
