import { randomUUID } from "node:crypto" 
import { FriendsRepository } from "../repositories/FriendsRepository.js"

export const FriendsController = {

  async addFriend (req, res) {

    const {
      nicknameRef
    } = req.body
    
    
    const youAreAlreadyFriends = await FriendsRepository.youAreAlreadyFriends(nicknameRef, req.userId)
    console.log(youAreAlreadyFriends)

    if(youAreAlreadyFriends.length > 0) {
      return res.status(400).json({ error: "you are already friends." })
    }

    try {
      
      const result = await FriendsRepository.addFriend({
        id: randomUUID(),
        nicknameRef,
        userId: req.userId
      })

      return res.status(201).json({ message: result})
    } catch (error) {
      return res.status(400).json({ error: "unable to friend"})
    }
   
  },

  
  async getAllFriends (req,res) {
    try {

      const result = await FriendsRepository.getFriends(req.userId)
      
      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({ error: "error fetching friends" })
    }
  },
}
