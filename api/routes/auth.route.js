import express from "express";
import { login, logout, register, currentUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", verifyToken, currentUser);

export default router;
