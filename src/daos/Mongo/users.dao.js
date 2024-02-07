import {userModel} from './models/user.model.js'

class UsersDao {
  static async getAll () {
    return userModel.find().lean()
  }

  static async add (user) {
    return new userModel(user).save()
  }
}

export default UsersDao