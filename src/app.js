const express = require('express')
const app = express()
const port = 8080
const routerProducts = require('./routes/products.router')
const routerCarts = require('./routes/carts.router')

app.use(express.json())
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)


app.listen(port, () => {
  console.log(`example listen in port ${port}`);
})