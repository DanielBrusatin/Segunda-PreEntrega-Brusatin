const express = require('express')
const cartManager = require('../cartManager')
const router = express.Router()

router.post('/', async(req, res) => {
  try {
    await cartManager.createCart()
    res.status(201).send({status: 'success', message: 'Carrito creado correctamente'})
  } catch (error) {
    res.status(error.message).send({ status: `error ${error.message}`, error: error.cause })
  }
})

router.get('/:cid', (req, res) => {
  try {
    res.send(cartManager.getCartById(req.params.cid))
  } catch (error) {
    res.status(error.message).send({ status: `error ${error.message}`, error: error.cause })
  }
})

router.post('/:cid/products/:pid', async(req, res) => {
  try {
    await cartManager.addProductToCart(req.params)
    res.status(201).send({ status: 'success', message: 'Producto agregado al carrito correctamente' })
  } catch (error) {
    res.status(error.message).send({ status: `error ${error.message}`, error: error.cause })
  }
})

module.exports = router