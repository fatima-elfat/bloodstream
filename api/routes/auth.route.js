import express from "express";
import { login, logout, register, currentUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", verifyToken, currentUser);
router.get("/test", (req,res) =>{
    res.send("Working This router")
});

export default router;
