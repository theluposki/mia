import { Users } from "../models/users.js"

export const UserRepository = {
  registerUser(body) {
    return Users.insert(body)
  },
  async getUsers() {
    return await Users.readAll()
  },
  async getOneByEmail(email){
    return await Users.getOneByEmail(email)
  }
}
