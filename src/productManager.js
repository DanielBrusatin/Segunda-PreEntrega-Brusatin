const fs = require('fs')
class ProductManager {
  constructor(path) {
    this.path = path
    this.products = this.getProducts()
    this.id = this.products.reduce((idMax, product) => idMax > product.id ? idMax : product.id, 0)
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
    if (Number.isInteger(Number(id)) && Number(id) > 0) {
      const response = this.readFile()
      if (response.find(product => product.id == id)) {
        return response.find(product => product.id == id)  
      } else {
        throw new Error('404', {cause: `No existe el producto con ID = ${id}`})
      }
    }
    else {
      throw new Error('400', {cause: `Ingresaste el ID '${id}' que es inválido. El ID debe ser un numero entero mayor 0.`})
    }
  }
  
  addProduct = async ({title, description, code, price, status, stock, category, thumbnails}) => {
    const newProduct = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
    }
    //Verifico que estén todos los campos y lanzo un error si falta alguno
    const missingFields = []
    Object.entries(newProduct).forEach(([key, value]) => !value && missingFields.push(key))
    if(missingFields.length) {
      throw new Error('400', {cause: `Falta/n el/los campo/s ${missingFields.join(', ')}`})
    }
    //Verifico que no se repita el codigo de producto
    if(!this.products.some(product => product.code == code)) {
      this.id++
      this.products.push({...newProduct, thumbnails, id: this.id})
      await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    } else {
      throw new Error('400', {cause: `Ya existe un producto con el código ${code}`})
    }
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

module.exports = new ProductManager('products.json')

