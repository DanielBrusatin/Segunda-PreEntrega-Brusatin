const express = require('express')
const productManager = require('../productManager')
const router = express.Router()

router.get('/', (req, res) => {
  try {
    const products = productManager.getProducts()
    const { limit } = req.query
    if (!limit) {
      res.status(200).send({status: 'success', payload: products})
    } else if (Number.isInteger(Number(limit)) && Number(limit) > 0) {
      res.status(200).send({status: 'success', payload: products.slice(0, limit)})
    } else {
      res.status(400).send({ status: 400, error: `Ingresaste el límite '${limit}' que es inválido. El límite debe ser un numero entero mayor que 0.` })
    }
  } catch (error) {
    res.status(404).send({ status: 404, error: error.cause })
  }
})

router.get('/:pid', (req, res) => {
  try {
    res.send(productManager.getProductById(req.params.pid))
  } catch (error) {
    res.status(error.message).send({ status: error.message, error: error.cause })
  }
})

router.post('/', (req, res) => {
  try {
    productManager.addProduct(req.body)
    res.status(201).send({status: 'success', message: 'Producto agregado'})
  } catch (error) {
    res.status(error.message).send({ status: error.message, error: error.cause })
  }
})

module.exports = router
