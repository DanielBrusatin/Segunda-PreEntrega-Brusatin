import Carts from '../models/cart.model.js'
import ProductsDao from "./products.dao.js";

class CartsDao {

  //Funcion para validar el ID
  static async validateId(cid) {
    // Compruebo que el ID sea válido (El ID de mongo tiene siempre 24 caracteres)
    if (cid.length == 24) {
      //Compruebo que exista el carrito con ese ID
      if (!await Carts.findById(cid)) {
        throw new Error('404', { cause: `No existe el carrito con ID = ${cid}` })
      }
    } else {
      throw new Error('400', { cause: `Ingresaste el ID de carrito '${cid}' que es inválido.` })
    }
  }

  static async createCart() {
    try {
      await new Carts().save()
    } catch (error) {
      throw new Error('500', { cause: 'No se pudo crear el carrito, intentar nuevamente.' })
    }
  }

  static async getCartById(cid) {
    await this.validateId(cid)
    try {
      return (await Carts.findById(cid)).products
    } catch {
      throw new Error('500', { cause: 'Error al leer base de datos' })
    }
  }

  static async addProductToCart({ cid, pid }) {
    await this.validateId(cid)
    //Compruebo que el ID de producto sea valido y que exista el producto con ese PID
    try {
      await ProductsDao.getProductById(pid)
    } catch (error) {
      throw new Error(error.message, { cause: error.cause })
    }
    //Compruebo si ya existe el producto en el carrito para agregarlo o sumarle uno a la cantidad
    const productsInCart = (await Carts.findById(cid)).products 
    const productIndex = productsInCart.findIndex(cartItem => cartItem._id == pid)
    if (productIndex !== -1) {
      try {
        await Carts.findByIdAndUpdate(cid, {$inc: {'products.$[elem].quantity': 1}}, { arrayFilters: [{ 'elem._id': pid }] })
      } catch {
        throw new Error('500', { cause: 'Error al leer base de datos' })
      }
    } else {
      try {
        await Carts.findByIdAndUpdate(cid, {$push: {'products': { _id: pid, quantity: 1 }}})
      } catch {
        throw new Error('500', { cause: 'Error al leer base de datos' })
      }
    }
  }
}

export default CartsDao