import express from "express"
import ProductsDao from "../daos/Mongo/products.dao.js"
const router = express.Router()

router.get('/', async (req, res) => {
  const products = await ProductsDao.getProducts()
  console.log(products);
  res.render('home', {products})
})
router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts')
})

export default router