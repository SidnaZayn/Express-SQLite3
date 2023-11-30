import express from "express";
import verifyAuth from "../../middleware/AuthGuard.js";
import { login, testToken, getUsers} from "./user.controller.js";

const router = express.Router();

router.post('/auth/login', login);
router.get('/auth/users', verifyAuth, getUsers);
router.get('/auth/testing', verifyAuth, testToken);
export default router