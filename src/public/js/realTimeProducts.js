const socket = io()
const products = [{ stock: 0 }, { stock: 1 }]
const form = document.getElementById('agregarProducto')
const catalogue = document.getElementById('catalogue')

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