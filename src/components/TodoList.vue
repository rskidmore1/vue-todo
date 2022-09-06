<template>
  <div id="todo-list">
    <div class="list-item-holder" v-if="n.location == location" :data-status="n.completed">
      <input type="checkbox" :data-id="n.id" :id="n.id" @click="updateTodo" :checked="n.completed" /><label :data-id="n.id" :for="n.id"> </label>
      <div class="delete-item" @click="deleteItem" :data-id="n.id">Delete</div>
      <div class="archive-item" v-if="n.location !== 'archive'" @click="archiveItem" :data-id="n.id">Archive</div>
    </div>
  </div>
  <div id="new-todo-list-item">
    <input type="text" id="new-todo-list-item-input" @keyup="updateItemText" />
    <input type="submit" id="new-todo-list-item-submit" @click="newItem" value="Add To Do List Item" />
  </div>
</template>

<script>
    import { useStore } from 'vuex';
    import { v4 as uuidv4 } from 'uuid';

    // export default {
    //   beforeCreate(){
    //     // get our store
    //     const store = useStore();
    //     store.commit('loadStore')
    //   }
    // }

    export default {
      name: "TodoList",
      data(){
        return {
          newTodoItem: ''
        }
      },
      props: { location: String },
      setup() {
        const store = useStore();

        return {
          todos: store.getters.todos
        }
      }
    }

  </script>

<style scoped>
  .list-item-holder{
    display: flex;
  }

  [data-status='true'] label {
    test-decoration: line-through;
  }
</style>
