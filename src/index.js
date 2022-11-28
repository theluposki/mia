import app from './app.js'
import config from './config.js'


app.listen(config.port, () => {
  console.log(`[ APP ] running at http://${config.host}:${config.port}`)
})
