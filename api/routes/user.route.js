import express from "express";
import {
    addUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    verifyEmail,
    generateMfA,
    verifyMfA,
    deleteMfA

} from "../controllers/user.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();
router.post("/add", verifyToken, addUser);
router.get("/", getUsers);
router.get("/user/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/verify/:token", verifyToken, verifyEmail);
router.post("/mfa/enable", verifyToken, generateMfA);
router.post("/mfa/verify", verifyToken, verifyMfA);
router.post("/mfa/disable", verifyToken, deleteMfA);
export default router;
