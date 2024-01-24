import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import productManager from './productManager.js'

const app = express()
const port = 8080
const httpServer = app.listen(port, () => {
  console.log(`example listen in port ${port}`);
})
const socketServer = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)

socketServer.on('connection', socket => {
  console.log('nuevo cliente conectado')
  socket.on('nuevo_producto', async producto => {
    await productManager.addProduct(producto)
    socketServer.emit('productos', productManager.getProducts())
  })
  socket.emit('productos', productManager.getProducts())
})
