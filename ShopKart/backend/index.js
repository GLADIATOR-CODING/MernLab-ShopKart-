import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import customerRoutes from "./routes/customer.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import productRoutes from './routes/product.route.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, ".env") })

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("successfully connected")
}).catch((err) => { console.log("Database connection error:", err.message) })

app.use("/customers", customerRoutes);
app.use('/products', productRoutes);

app.listen(process.env.PORT, () => {
    console.log("Success in hosting on port:" + process.env.PORT)
})