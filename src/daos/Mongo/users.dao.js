import Users from './models/user.model.js'

class UsersDao {
  static async getAll () {
    return Users.find().lean()
  }

  static async add (user) {
    return new Users(user).save()
  }
}

export default UsersDao