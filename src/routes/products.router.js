import express from 'express'
import productManager from '../productManager.js'
const router = express.Router()

router.get('/', (req, res) => {
  try {
    const products = productManager.getProducts()
    const { limit } = req.query
    if (!limit) {
      res.status(200).send({ status: 'success', payload: products })
    } else if (Number.isInteger(Number(limit)) && Number(limit) > 0) {
      res.status(200).send({ status: 'success', payload: products.slice(0, limit) })
    } else {
      res.status(400).send({ status: 'error 400', error: `Ingresaste el límite '${limit}' que es inválido. El límite debe ser un numero entero mayor que 0.` })
    }
  } catch (error) {
    res.status(404).send({ status: 'error 404', error: error.cause })
  }
})

router.get('/:pid', (req, res) => {
  try {
    const product = productManager.getProductById(req.params.pid)
    res.status(200).send({ status: 'success', payload: product })
  } catch (error) {
    res.status(error.message).send({ status: `error ${error.message}`, error: error.cause })
  }
})

router.post('/', async(req, res) => {
  try {
    await productManager.addProduct(req.body)
    res.status(201).send({ status: 'success', message: 'Producto agregado correctamente' })
  } catch (error) {
    res.status(error.message).send({ status: `error ${error.message}`, error: error.cause })
  }
})

router.put('/:pid', async(req, res) => {
  try {
    await productManager.updateProduct(req.params.pid, req.body)
    res.status(200).send({ status: 'success', message: 'Producto actualizado correctamente' })
  } catch (error) {
    res.status(error.message).send({ status: `error ${error.message}`, error: error.cause })
  }
})

router.delete('/:pid', async(req, res) => {
  try {
    await productManager.deleteProduct(req.params.pid)
    res.status(204).send()
  } catch (error) {
    res.status(error.message).send({ status: `error ${error.message}`, error: error.cause })
  }
})

export default router
