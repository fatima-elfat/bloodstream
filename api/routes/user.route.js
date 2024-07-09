import express from "express";
import {
    addUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/add", verifyToken, addUser);
router.get("/", getUsers);
router.get("/user/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
export default router;
