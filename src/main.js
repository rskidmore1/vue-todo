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
    loadStore(){
      if(localStorage.getItem('store')){
        try {
          this.replaceState(JSON.parse(localStorage.getItem('store')));
        } catch(e){
           console.log('Could not initialize store', e);
        }
      }
    }
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
    },
    addTodo(state, todoItem){
      if(todoItem.id !== undefined && typeof todoItem.name == 'string' && typeof todoItem.completed == 'boolean'){
        state.todos.push({
          id: todoItem.id,
          name: todoItem.name,
          completed: todoItem.completed,
          location: 'home'
        })
      },
      deleteTodo(state, todoItem){
        let id = todoItem.id;
        let removedEl = state.todos.findIndex((x)=> x.id == id);
        if(removedEl !== null){
          state.todos.splice(removedEl, 1);
        }
      },
      moveTodoItem(state, todoItem){
        let id = todoItem.id;
        let location = todoItem.location;
        let findEl = state.todos.find((x) => x.id == id);

        if(findEl !== null){
          findEl.location = location;
        } else {
             console.log(`To Do List Item ${id} couldn't be found`);
        }
      }
    }
  },
  methods: {
    updateItemText: function(e){
      this.newTodoItem = e.currentTarget.value;
      if(e.keyCode === 13){
        this.newTodoItem();
      }
      return false;
    },
    updateTodo: function(e){
      let newStatus = e.currentTarget.parentElement.getAttribute('data-status') == "true" ? false : true;
      this.$store.commit('updateTodo', {
        id: e.currentTarget.getAttribute('data-id'),
        completed: newStatus
      })
    },
    deleteItem: function(e){
      this.$store.commit('deleteTodo', {
        id: e.currentTarget.getAttribute('data-id')
      })
    },
    newItem: function(){
      if(this.newTodoItem !== ''){
        this.$store.commit('addTodo', {
          id: uuidv4(),
          name: this.newTodoItem,
          completed: false
        })
      }
    },
    archiveItem: function(e){
      this.$store.commit('moveTodoItem', {
        id: e.currentTarget.getAttribute('data-id'),
        location: 'archive'
      })
    }
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state))
})

app.use(router).use(store).mount('#app')
