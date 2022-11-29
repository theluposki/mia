import { Profiles } from "../models/profiles.js"

export const ProfileRepository = {
  addProfile(body) {
    return Profiles.insert(body)
  },
  async getProfiles() {
    return await Profiles.readAll()
  },
  async getMyProfile(id) {
    return await Profiles.getMyProfile(id)
  },
}
