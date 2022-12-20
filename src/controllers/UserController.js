import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { randomUUID } from "node:crypto" 
import { UserRepository } from "../repositories/UserRepository.js"
import config from "../config.js"

export const UserController = {
  async auth(req,res) {
    const { email, password } = req.body

    try {
      if (!email || !password ) {
        const messageError = "enter email and password"
        return res.status(400).json({ error: messageError })
      }
      
      const existingUser = await UserRepository.getOneByEmail(email)

      if (!existingUser) {
        return res.status(400).json({ error: "User not found." })
      }

      
      if (!(await bcrypt.compare(password, existingUser.password))) {
        return res.status(400).json({ error: "Invalid password." })
      }

      const token = jwt.sign({ id: existingUser.id }, config.secret, {
        expiresIn: 86400
      })

      return res.status(200).json({
        token,
        msg: "Authenticated successfully!"
      })


    } catch (error) {
      res.status(400).json({ error: "Unable to authenticate."})
    }
  },


  async registerUser(req, res) {
    const { name, nickname, email, password } = req.body
    
    try {

      if (!name || !nickname || !email || !password ) {
        const messageError = "to register you need some essential data. [ name, nickname, email, password ]"
        return res.status(400).json({ error: messageError })
      }

      const existingUser = await UserRepository.getOneByEmail(email)

      if (existingUser) {
        return res.status(400).json({ error: "User already exists" })
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


  async getMyUser(req,res) {
    try {
      const user = await UserRepository.getMyUser(req.userId)
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json({ error: "Could not find user."})
    }
  },


  async getUsers(req, res) {
    try {
      const user = await UserRepository.getUsers()
      res.status(200).json(user)
    } catch (error) {
      return res.status(400).json({ error: "Unable to fetch users."})
    }
  }
}
