import Customer from "../models/customer.model.js";
import bcrypt from "bcrypt"
import generateTokenandSetCookie from "../utils/generateToken.js";
import dotenv from "dotenv"
dotenv.config()

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, phone } = req.body

        if (!fullName || !email || !password || !phone) {
            return res.status(400).json({ message: "Missing Fields" })
        }
        const Emailexisting = await Customer.findOne({ email })
        if (password.length < 6) {
            return res.status(400).json({ message: "Password too short" })
        }
        if (Emailexisting) {
            return res.status(409).json({ message: "Email already exists" })
        }

        const hashP = await bcrypt.hash(password, 10)
        const newCustomer = await Customer.create({
            fullName,
            email,
            password: hashP,
            phone
        })
        res.status(201).json({
            success: true,
            message: "Customer registered successfully",
            customer: {
                _id: newCustomer._id,
                fullName: fullName,
                email: email,
                phone: phone
            }
        })

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await Customer.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid Email or Password" })
        }

        const compare = await bcrypt.compare(password, user.password)
        if (!compare) {
            return res.status(401).json({ message: "Invalid Email or Password" })
        }
        const token = generateTokenandSetCookie(res, user._id)

        return res.status(200).json({
            sucess: true,
            message: "Login Successfull",
            customer: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone
            }
        })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

}
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        })
        return res.status(200).json({
            sucess: true,
            message: "Logged Out successfully"
        })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const showCustomer = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            customer: req.user
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export { registerUser, loginUser, logoutUser, showCustomer }