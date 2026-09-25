import express from "express"
import { loginUser, logoutUser, registerUser, showCustomer } from "../controllers/customer.controller.js"
import authMiddleWare from "../middlewares/auth.middleware.js";

const router = express.Router()
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', authMiddleWare, logoutUser)
router.get('/me', authMiddleWare, showCustomer)

export default router