import { Friends } from "../models/friends.js"

export const FriendsRepository = {
  addFriend(body) {
    return Friends.insert(body)
  },
  async getFriends(id) {
    return await Friends.readAll(id)
  },

  async youAreAlreadyFriends(nickname, userId) {
    return await Friends.youAreAlreadyFriends(nickname, userId)
  },
}
