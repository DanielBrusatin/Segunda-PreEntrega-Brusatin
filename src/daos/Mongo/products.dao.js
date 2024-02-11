import Products from './models/product.model.js'

class ProductsDao {

  //Funcion para validar el ID
  static async validateId(id) {
    // Compruebo que el ID sea válido (El ID de mongo tiene siempre 24 caracteres)
    if (id.length == 24) {
      //Compruebo que exista el producto con ese ID
      if (!await Products.findById(id)) {
        throw new Error('404', { cause: `No existe el producto con ID = ${id}` })
      }
    } else {
      throw new Error('400', { cause: `Ingresaste el ID '${id}' que es inválido.` })
    }
  }

  static async getProducts() {
    try {
      return await Products.find()
    } catch {
      throw new Error('500', { cause: 'Error al leer base de datos' })
    }
  }

  static async getProductsWithLimit(limit) {
    //Verifico que el limite sea un numero entero y mayor que cero
    if (Number.isInteger(Number(limit)) && Number(limit) > 0) {
      try {
        return await Products.find().limit(limit)
      } catch {
        throw new Error('500', { cause: 'Error al leer base de datos' })
      }
    } else {
      throw new Error('400', { cause: `Ingresaste el límite '${limit}' que es inválido. El límite debe ser un numero entero mayor que 0.` })
    }
  }

  static async getProductById(id) {
    await this.validateId(id)
    try {
      return await Products.findById(id)
    } catch {
      throw new Error('500', { cause: 'Error al leer base de datos' })
    }
  }

  static async addProduct({ title, description, code, price, status, stock, category, thumbnails }) {
    const newProduct = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
    }
    //Verifico que estén todos los campos obligatorios y lanzo un error si falta alguno
    const missingFields = []
    Object.entries(newProduct).forEach(([key, value]) => !value && missingFields.push(key))
    if (missingFields.length) {
      throw new Error('400', { cause: `Falta/n el/los campo/s ${missingFields.join(', ')}` })
    }
    //Verifico que no se repita el codigo de producto
    if (await Products.findOne({ code: code })) {
      throw new Error('400', { cause: `Ya existe un producto con el código ${code}` })
    } else {
      try {
        await new Products({ ...newProduct, thumbnails }).save()
      } catch (error) {
        throw new Error('500', { cause: 'No se pudo agregar el producto, intentar nuevamente.' })
      }
    }
  }

  static async updateProduct(id, newProduct) {
    await this.validateId(id)
    try {
      await Products.findByIdAndUpdate(id, newProduct)
    } catch {
      throw new Error('500', { cause: 'No se pudo agregar el producto, intentar nuevamente.' })
    }
  }

  static async deleteProduct(id) {
    await this.validateId(id)
    try {
      await Products.findByIdAndDelete(id)
    } catch {
      throw new Error('500', { cause: 'No se pudo eliminar el producto, intentar nuevamente.' })
    }
  }
}

export default ProductsDao