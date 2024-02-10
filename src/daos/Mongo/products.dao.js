import Products from './models/product.model.js'

class ProductsDao {

  static async getProducts() {
    try {
      return await Products.find()
    } catch {
      throw new Error('500', { cause: 'Error al leer base de datos' })
    }
  }

  static async getProductsWithLimit(limit) {
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
    // Compruebo que el ID sea válido (El ID de mongo tiene siempre 24 caracteres)
    if (id.length != 24) {
      throw new Error('400', { cause: `El ID = ${id} es invalido` })
    }
    //Compruebo que exista el producto con ese ID
    const product = await Products.findById(id)
    if (product) {
      return product
    } else {
      throw new Error('404', { cause: `No existe el producto con ID = ${id}` })
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
    if (await Products.findOne({code: code})) {
      throw new Error('400', { cause: `Ya existe un producto con el código ${code}` })
    } else {
      try {
        await new Products({...newProduct, thumbnails}).save()
      } catch (error){
        throw new Error('500', { cause: 'No se pudo agregar el producto, intentar nuevamente.' })
      }
    }
  }


}

export default ProductsDao



// updateProduct = async (id, newProduct) => {
//   //Verifico que se haya pasado un ID válido
//   if (Number.isInteger(Number(id)) && Number(id) > 0) {
//     const index = this.products.findIndex(product => product.id == id)
//     //Compruebo que exista el producto con ese ID
//     if (index !== -1) {
//       //Actualizo las keys pasadas en "newProduct" que tenga el producto excepto el ID
//       for (const key in newProduct) {
//         if (this.products[index].hasOwnProperty(key) && key != 'id') {
//           this.products[index][key] = newProduct[key];
//         }
//       }
//       try {
//         await fs.promises.writeFile(this.path, JSON.stringify(this.products))
//       } catch {
//         throw new Error('500', { cause: 'No se pudo agregar el producto, intentar nuevamente.' })
//       }
//     } else {
//       throw new Error('404', { cause: `No existe el producto con ID = ${id}` })
//     }
//   } else {
//     throw new Error('400', { cause: `Ingresaste el ID '${id}' que es inválido. El ID debe ser un numero entero mayor 0.` })
//   }
// }

// deleteProduct = async (id) => {
//   //Verifico que se haya pasado un ID válido
//   if (Number.isInteger(Number(id)) && Number(id) > 0) {
//     //Compruebo que exista el producto con ese ID
//     if (this.products.find(product => product.id == id)) {
//       this.products = this.products.filter(product => product.id != id)
//       try {
//         await fs.promises.writeFile(this.path, JSON.stringify(this.products))
//       } catch {
//         throw new Error('500', { cause: 'No se pudo eliminar el producto, intentar nuevamente.' })
//       }
//     } else {
//       throw new Error('404', { cause: `No existe el producto con ID = ${id}` })
//     }
//   } else {
//     throw new Error('400', { cause: `Ingresaste el ID '${id}' que es inválido. El ID debe ser un numero entero mayor 0.` })
//   }
// }
