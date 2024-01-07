const fs = require('fs')
class ProductManager {
  constructor(path) {
    this. products = []
    this.id = 0
    this.path = path
  }

  readFile = () => {
    try {
      const res =  fs.readFileSync(this.path, 'utf-8')
      return JSON.parse(res)
    }
    catch (error){
      return error
    }
  }
  
    getProducts =  () => {
      const response = this.readFile()
      return response
    }
  
    getProductById = (id) => {
      const response = this.readFile()
      return response.find(product => product.id == id) ?? `No existe el producto con ID = ${id}`
    }
  
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    if (title && description && price && thumbnail && code && stock) {  //Chequeo que esten todos los campos
      if(!this.products.some(product => product.code == code)) {  //Verifico que no se repita el codigo
        const product = {
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          id: this.id
        }
        this.products.push(product)
        this.id++
        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
      } else {
        console.log(`Producto con codigo ${code} existente`)
      }
    } else {console.log('Falta un campo')}
  }

  updateProduct = async ({id, ...product}) => {
    if(await this.deleteProduct(id)) {
      const oldProducts = await this.readFile()
      const newProducts = [
        ...oldProducts,
        {...product, id}
      ]
      await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
    }
  }

  deleteProduct = async (id) => {
    const response = await this.readFile()
    if (!response.find(product => product.id == id)) {
      console.log(`Producto con ID:"${id}" no encontrado`)
      return false
    }
    const newList = response.filter(product => product.id != id)
    await fs.promises.writeFile(this.path, JSON.stringify(newList))
    return true
  }
}

module.exports = new ProductManager('catalogo.json')

