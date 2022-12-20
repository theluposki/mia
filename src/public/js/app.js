import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const pinia = Pinia().createPinia()

const app = createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  })

app.use(pinia)  
app.mount('#app')
