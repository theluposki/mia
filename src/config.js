import * as dotenv from 'dotenv'
dotenv.config()

export default {
  port: process.env.PORT || 3000,
  host: "localhost",
  secret: process.env.SECRET
}
