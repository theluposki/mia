import bcrypt from "bcryptjs"
import { randomUUID } from "node:crypto" 
import { UserRepository } from "../repositories/UserRepository.js"

export const UserController = {
  
  async registerUser(req, res) {
    const { name, nickname, email, password } = req.body
    
    try {

      if (!name || !nickname || !email || !password ) {
        const messageError = "to register you need some essential data. [ name, nickname, email, password ]"
        return res.status(400).json({ error: messageError })
      }

      const regexEmail = /\S+@\S+\.\S+/
      
      if(null === email.match(regexEmail)) {
        const messageError = "use a valid email!"
        return res.status(400).json({ error: messageError})
      }

      const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

      
      if(null === password.match(regexPassword)) {
        const messageError = "The password must have a minimum of eight characters, at least one uppercase letter, one lowercase letter and one number!"
        return res.status(400).json({ error: messageError})
      }

      const message = await UserRepository.registerUser({
        id: randomUUID(),
        name, 
        nickname,
        email, 
        password: await bcrypt.hash(password, 10),
        createAt: Date.now()
      })

      res.status(201).json(message)
    } catch (error) {
        return res.status(400).json({ error: "erro ao se registrar" })
    }
  },




  async getUsers(req, res) {
    const user = await UserRepository.getUsers()
    res.status(200).json(user)
  }
}
