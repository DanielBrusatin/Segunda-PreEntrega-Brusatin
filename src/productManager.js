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
    catch {
      throw new Error('404', {cause: `Can't find the file '${this.path}'`})
    }
  }
  
  getProducts = () => {
    const response = this.readFile()
    return response
  }

  getProductById = (id) => {
    if (Number.isInteger(Number(id)) && Number(id) >= 0) {
      const response = this.readFile()
      if (response.find(product => product.id == id)) {
        return response.find(product => product.id == id)  
      } else {
        throw new Error('404', {cause: `No existe el producto con ID = ${id}`})
      }
    }
    else {
      throw new Error('400', {cause: `Ingresaste el ID '${id}' que es inválido. El ID debe ser un numero entero mayor o igual a 0.`})
    }
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

