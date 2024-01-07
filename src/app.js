const express = require ('express')
const productManager = require('./productManager')
const app = express()
const port = 8080

app.get('/products', (req, res) => {
    const products = productManager.getProducts()
    const {limit} = req.query
    if (!limit) {
        res.send(products)
    } else if (Number.isInteger(Number(limit)) && Number(limit) > 0) {
        res.send(products.slice(0, limit))
    } else {
        res.send(`Ingresaste el límite ${limit} que es inválido. El límite debe ser un numero entero mayor que 0.`)
    }
})

app.get('/products/:pid', (req, res) => {
    res.send(productManager.getProductById(req.params.pid))
})

app.listen(port, () => {
    console.log(`example listen in port ${port}`);
})