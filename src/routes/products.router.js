import express from 'express'
import productManager from '../daos/fileSystem/productManager.js'
import ProductsDao from '../daos/Mongo/products.dao.js'
const router = express.Router()

router.get('/', async(req, res) => {
  try {
    const { limit } = req.query
    if (!limit) {
      const products = await ProductsDao.getProducts()
      res.status(200).send({ status: 'success', payload: products })
    } else {
      const products = await ProductsDao.getProductsWithLimit(limit)
      res.status(200).send({ status: 'success', payload: products })
    } 
  } catch (error) {
    res.status(error.message).send({ status: `error ${error.message }`, error: error.cause })
  }
})

router.get('/:pid', async(req, res) => {
  try {
    const product = await ProductsDao.getProductById(req.params.pid)
    res.status(200).send({ status: 'success', payload: product })
  } catch (error) {
    res.status(error.message).send({ status: `error ${error.message}`, error: error.cause })
  }
})

router.post('/', async(req, res) => {
  try {
    await ProductsDao.addProduct(req.body)
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
