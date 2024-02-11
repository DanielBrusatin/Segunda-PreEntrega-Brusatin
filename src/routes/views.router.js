import express from "express"
import ProductsDao from "../daos/Mongo/products.dao.js"
const router = express.Router()

//Mostrar lista de productos
router.get('/', async (req, res) => {
  const products = await ProductsDao.getProducts()
  console.log(products);
  res.render('home', {products})
})

//Mostrar en tiempo real los productos
router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts')
})

//Chat con websocket
router.get('/chat', (req, res) => {
  res.render('chat')
})

export default router