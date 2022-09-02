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
    return {
      todos: [
        { id: 'first-element', name: 'My First To Do Item', completed: false, location: 'home' }
      ]
    }
  },
  getters: {
    todos(state) {
      return state.todos;
    }

  },
  mutations: {
    updateTodo(state, todoItem) {

      let id = todoItem.id;
      let completed = todoItem.completed;
      let name = todoItem.name;

      let findEl = state.todos.find((x) => x.id == id);
      if (findEl !== null) {
        if (completed !== undefined) {
          findEl.completed = completed;
        }
        if (name !== undefined) {
          findEl.name = name;
        }
      } else {
        console.log(`To Do List ${id} couldn't be found`)
      }
    }
  }
})

app.use(router).use(store).mount('#app')
