import express from "express"
import ProductsDao from "../daos/Mongo/products.dao.js"
const router = express.Router()

//Mostrar lista de productos
router.get('/', async (req, res) => {
  const products = await ProductsDao.getProducts()
  res.render('home', {products})
})

//Mostrar en tiempo real los productos
router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {status: req.query.status, error: req.query.error})
})

//Chat con websocket
router.get('/chat', (req, res) => {
  res.render('chat')
})

export default router