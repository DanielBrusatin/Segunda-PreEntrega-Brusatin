const fs = require('fs')
const { id } = require('./productManager')
class cartManager {
  constructor(path) {
    this.path = path
    this.carts = this.readFile()
    this.id = this.carts.reduce((idMax, cart) => idMax > cart.id ? idMax : cart.id, 0)
  }

  readFile = () => {
    try {
      const res = fs.readFileSync(this.path, 'utf-8')
      return JSON.parse(res)
    }
    catch {
      throw new Error('404', { cause: `Can't find the file '${this.path}'` })
    }
  }

  createCart = async() => {
    this.id++
    const newCart = {id: this.id, products: []}
    this.carts.push(newCart)
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
    } catch {
      throw new Error('500', {cause: 'No se pudo crear el carrito, intentar nuevamente.'})
    }
  }

  //   getcarts = () => {
  //     const response = this.readFile()
  //     return response
  //   }

  getCartById = (id) => {
    //Verifico que se haya pasado un ID válido
    if (Number.isInteger(Number(id)) && Number(id) > 0) {
      const response = this.readFile()
      //Compruebo que exista el carto con ese ID
      if (response.find(cart => cart.id == id)) {
        return response.find(cart => cart.id == id).products
      } else {
        throw new Error('404', { cause: `No existe el carrito con ID = ${id}` })
      }
    } else {
      throw new Error('400', { cause: `Ingresaste el ID '${id}' que es inválido. El ID debe ser un numero entero mayor 0.` })
    }
  }


  //   addcart = async ({title, description, code, price, status, stock, category, thumbnails}) => {
  //     const newcart = {
  //       title,
  //       description,
  //       code,
  //       price,
  //       status,
  //       stock,
  //       category,
  //     }
  //     //Verifico que estén todos los campos y lanzo un error si falta alguno
  //     const missingFields = []
  //     Object.entries(newcart).forEach(([key, value]) => !value && missingFields.push(key))
  //     if(missingFields.length) {
  //       throw new Error('400', {cause: `Falta/n el/los campo/s ${missingFields.join(', ')}`})
  //     }
  //     //Verifico que no se repita el codigo de carto
  //     if(!this.carts.some(cart => cart.code == code)) {
  //       this.id++
  //       this.carts.push({...newcart, thumbnails, id: this.id})
  //       try {
  //         await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
  //       } catch {
  //         throw new Error('500', {cause: 'No se pudo agregar el carto, intentar nuevamente.'})
  //       }
  //     } else {
  //       throw new Error('400', {cause: `Ya existe un carto con el código ${code}`})
  //     }
  //   }

  //   updatecart = async (id, newcart) => {
  //     //Verifico que se haya pasado un ID válido
  //     if (Number.isInteger(Number(id)) && Number(id) > 0) {
  //       const index = this.carts.findIndex( cart => cart.id == id)
  //       //Compruebo que exista el carto con ese ID
  //       if (index !== -1) {
  //         //Actualizo las keys pasadas en "newcart" que tenga el carto excepto el ID
  //         for (const key in newcart) {
  //           if (this.carts[index].hasOwnProperty(key) && key != 'id') {
  //             this.carts[index][key] = newcart[key];
  //           }
  //         }
  //         try {
  //           await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
  //         } catch {
  //           throw new Error('500', {cause: 'No se pudo agregar el carto, intentar nuevamente.'})
  //         }
  //       } else {
  //         throw new Error('404', {cause: `No existe el carto con ID = ${id}`})
  //       }
  //     } else {
  //       throw new Error('400', {cause: `Ingresaste el ID '${id}' que es inválido. El ID debe ser un numero entero mayor 0.`})
  //     }
  //   }

  //   deletecart = async (id) => {
  //     //Verifico que se haya pasado un ID válido
  //     if (Number.isInteger(Number(id)) && Number(id) > 0) {
  //       //Compruebo que exista el carto con ese ID
  //       if (this.carts.find(cart => cart.id == id)) {
  //         this.carts = this.carts.filter(cart => cart.id != id)
  //         try {
  //           await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
  //         } catch {
  //           throw new Error('500', {cause: 'No se pudo eliminar el carto, intentar nuevamente.'})
  //         }
  //       } else {
  //         throw new Error('404', {cause: `No existe el carto con ID = ${id}`})
  //       }
  //     } else {
  //       throw new Error('400', {cause: `Ingresaste el ID '${id}' que es inválido. El ID debe ser un numero entero mayor 0.`})
  //     }
  //   }
}

module.exports = new cartManager('carts.json')

