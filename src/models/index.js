import { Users } from "./users.js"
import { Profiles } from "./profiles.js"

export const InitializeDatabase = () => {
  Users.createTable()
  Profiles.createTable()
}
