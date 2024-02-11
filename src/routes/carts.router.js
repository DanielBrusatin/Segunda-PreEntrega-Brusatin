import express from 'express'
import CartsDao from '../daos/Mongo/carts.dao.js'
const router = express.Router()

//Crear carrito
router.post('/', async(req, res) => {
  try {
    await CartsDao.createCart()
    res.status(201).send({ status: 'success', message: 'Carrito creado correctamente' })
  } catch (error) {
    res.status(error.message).send({ status: `error ${error.message}`, error: error.cause })
  }
})

//Obtener productos de un carrito
router.get('/:cid', async(req, res) => {
  try {
    const cart = await CartsDao.getCartById(req.params.cid) 
    res.status(200).send({ status: 'success', payload: cart })
  } catch (error) {
    res.status(error.message).send({ status: `error ${error.message}`, error: error.cause })
  }
})

//Agregar un producto al carrito
router.post('/:cid/product/:pid', async(req, res) => {
  try {
    await CartsDao.addProductToCart(req.params)
    res.status(201).send({ status: 'success', message: 'Producto agregado al carrito correctamente' })
  } catch (error) {
    res.status(error.message).send({ status: `error ${error.message}`, error: error.cause })
  }
})

export default router