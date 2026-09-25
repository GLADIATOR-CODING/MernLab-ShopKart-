import express from "express"
import { createProduct, showProducts, singleProduct } from "../controllers/product.controller.js"

const router = express.Router()

router.post('/', createProduct)
router.get('/', showProducts)
router.get('/:id', singleProduct)

export default router
