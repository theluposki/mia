import { randomUUID } from "node:crypto" 
import { FriendsRepository } from "../repositories/FriendsRepository.js"

export const FriendsController = {

  async addFriend (req, res) {

    if(req.body.userId !== req.userId) return res.status(400).json({ error: "Error adding friend"})

    const {
      nicknameRef,
      userId
    } = req.body
    
    const youAreAlreadyFriends = await FriendsRepository.youAreAlreadyFriends(nicknameRef, userId)

    if(youAreAlreadyFriends) {
      return res.status(400).json({ error: "you are already friends." })
    }

    try {
      
      const result = await FriendsRepository.addFriend({
        id: randomUUID(),
        nicknameRef,
        userId
      })

      return res.status(201).json({ message: result})
    } catch (error) {
      return res.status(400).json({ error: "unable to profile"})
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
