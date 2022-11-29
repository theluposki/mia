import { randomUUID } from "node:crypto" 
import { ProfileRepository } from "../repositories/ProfileRepository.js"

export const ProfileController = {

  async addProfile (req, res) {

    if(req.params.id !== req.userId) return res.status(400).json({ error: "Error creating profile"})

    const { 
      messagemStatus,
      status,
      imgProfile,
      imgFrontCover,
      bio,
      telephone,
      birthDate,
      localization
    } = req.body

    try {
      
      const result = await ProfileRepository.addProfile({
        id: randomUUID(),
        messagemStatus,
        status,
        imgProfile,
        imgFrontCover,
        bio,
        telephone,
        birthDate,
        localization,
        userId: req.userId
      })

      return res.status(201).json({ message: result})
    } catch (error) {
      return res.status(400).json({ error: "unable to profile"})
    }
   
  },

  
  async getAllProfiles (req,res) {
    try {
      const result = await ProfileRepository.getProfiles()
      
      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({ error: "error fetching profiles" })
    }
  },

  async getMyProfile (req,res) {
    try {
      const result = await ProfileRepository.getMyProfile(req.userId)
      
      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({ error: "error fetching my profile" })
    }
  }
}
