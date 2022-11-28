import { Users } from "./users.js"

export const InitializeDatabase = () => {
  Users.createTable()
}
