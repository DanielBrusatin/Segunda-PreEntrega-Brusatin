import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import productManager from './productManager.js'

//Inicializo app y creo los servidores http y socket
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

//Indico ruta para archivos estáticos
app.use(express.static(__dirname + '/public'))

//Rutas para los diferentes router
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsRouter)

//Escucho evento de nueva conexión
socketServer.on('connection', socket => {
  console.log('nuevo cliente conectado')
  //Escucho evento para agregar producto 
  socket.on('add_product', async producto => {
    try {
      //Si se agrega el producto se envía evento de confirmación
      await productManager.addProduct(producto)
      socket.emit('success')
      //Envío evento a todos los sockets para actualizar la vista de productos
      socketServer.emit('products', productManager.getProducts())
    } catch {
      //Si hay un fallo al agregar el producto se envía evento de error 
      socket.emit('error')
    }
  })
  //Envio evento para renderizar la lista de productos a la nueva conexion
  socket.emit('products', productManager.getProducts())
})
