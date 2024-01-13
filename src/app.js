const express = require('express')
const productManager = require('./productManager')
const app = express()
const port = 8080

app.get('/products', (req, res) => {
  try {
    const products = productManager.getProducts()
    const { limit } = req.query
    if (!limit) {
      res.status(200).send(products)
    } else if (Number.isInteger(Number(limit)) && Number(limit) > 0) {
      res.status(200).send(products.slice(0, limit))
    } else {
      res.status(400).send({ status: 400, error: `Ingresaste el límite '${limit}' que es inválido. El límite debe ser un numero entero mayor que 0.` })
    }
  } catch (error) {
    res.status(404).send({ status: 404, error: error.cause })
  }
})

app.get('/products/:pid', (req, res) => {
  try {
    res.send(productManager.getProductById(req.params.pid))
  } catch (error) {
    res.status(error.message).send({ status: error.message, error: error.cause })
  }
})

app.listen(port, () => {
  console.log(`example listen in port ${port}`);
})