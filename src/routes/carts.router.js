import express from 'express'
import cartManager from '../cartManager.js'
const router = express.Router()

router.post('/', async(req, res) => {
  try {
    await cartManager.createCart()
    res.status(201).send({ status: 'success', message: 'Carrito creado correctamente' })
  } catch (error) {
    res.status(error.message).send({ status: `error ${error.message}`, error: error.cause })
  }
})

router.get('/:cid', (req, res) => {
  try {
    const cart = cartManager.getCartById(req.params.cid) 
    res.status(200).send({ status: 'success', payload: cart })
  } catch (error) {
    res.status(error.message).send({ status: `error ${error.message}`, error: error.cause })
  }
})

router.post('/:cid/product/:pid', async(req, res) => {
  try {
    await cartManager.addProductToCart(req.params)
    res.status(201).send({ status: 'success', message: 'Producto agregado al carrito correctamente' })
  } catch (error) {
    res.status(error.message).send({ status: `error ${error.message}`, error: error.cause })
  }
})

export default router