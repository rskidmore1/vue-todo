<template>
  <h1>To do List:</h1>
  <TodoList location="home" />

  <script>

    import TodoList from '../components/TodoList.vue';

    export default {
      name: 'HomePage',
      components: {
        TodoList
      }
    }
  </script>
</template>
