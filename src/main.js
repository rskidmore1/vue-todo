import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from '/router'

// Old code
// import './assets/main.css'
// createApp(App).mount('#app')

const app = createApp(App)

/// Create a store for our to do list items

const store = createStore({
  state() {

  },
  getters: {

  },
  mutations: {

  }
})

app.use(router).use(store).mount('#app')
