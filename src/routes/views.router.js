import express from "express"
import productManager from "../daos/fileSystem/productManager.js"
const router = express.Router()

router.get('/', (req, res) => {
  const products = productManager.getProducts()
  res.render('home', {products})
})
router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts')
})

export default router