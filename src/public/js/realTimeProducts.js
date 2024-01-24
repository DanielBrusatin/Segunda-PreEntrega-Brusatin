const socket = io()
const products = [{ stock: 0 }, { stock: 1 }]
const form = document.getElementById('agregarProducto')
const catalogue = document.getElementById('catalogue')

//Capturo campos del formulario, envío evento para agregar producto y borro contenido de los campos del formulario
form.addEventListener('submit', ev => {
  ev.preventDefault()
  const title = document.getElementById('title').value
  const description = document.getElementById('description').value
  const code = document.getElementById('code').value
  const price = document.getElementById('price').value
  const status = document.getElementById('status').value
  const stock = document.getElementById('stock').value
  const category = document.getElementById('category').value
  const newProduct = { title, description, code, price, status, stock, category }
  socket.emit('nuevo_producto', newProduct)
  for (var i = 0; i < form.elements.length; i++) {
    const elemento = form.elements[i]
    elemento.value = ''
  }
})

//Escucho evento para renderizar lista de productos
socket.on('productos', products => {
  while (catalogue.firstChild) {
    catalogue.removeChild(catalogue.firstChild)
  }
  products.forEach(product => {
    const content = `<div class="text-center card" style="width: 16rem; margin: 10px">
    <div class="card-header">Categoría: ${product.category}</div>
    <div class="card-body">
      <div class="card-title h5">${product.title}</div>
      <div class="mb-2 text-muted card-subtitle h6">Precio: $${product.price}</div>
      <p class="card-text">${product.description}</p>
    </div>
    <div class="text-muted card-footer">Stock disponible: ${product.stock} unidades</div>
  </div>`
    catalogue.innerHTML += content
  })
})

//Escucho evento de confirmacion de producto agregado
socket.on('success', () => {
  Swal.fire({
    title: "Agregado!",
    text: "Se agrego correctamente el producto",
    icon: 'success'
  });
})

//Escucho evento de error al agregar producto
socket.on('error', () => {
  Swal.fire({
    title: 'Ups!',
    text: "Ya existe un producto con ese código",
    icon: 'error'
  });
})