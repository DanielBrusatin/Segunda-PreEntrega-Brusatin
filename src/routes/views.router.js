import express from "express"
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8080';
const router = express.Router()

//Mostrar lista de productos
router.get('/products', async (req, res) => {
  axios.get('/api/products', {
    params: req.query
  })
  .then(response => res.render('products', response.data))
  .catch(error => console.log(error))
})

router.get('/carts/:cid', async (req, res) => {
  axios.get(`/api/carts/${req.params.cid}`)
  .then(response => res.render('cart', response.data.payload))
  .catch(error => console.log(error))
})

//Mostrar en tiempo real los productos
router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {status: req.query.status, error: req.query.error})
})

//Chat con websocket
router.get('/chat', (req, res) => {
  res.render('chat')
})

export default router