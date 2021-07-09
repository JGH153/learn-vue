<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>My Vue 3 JS TODO APP!</h1>
  <TodoInput @new-data-event="onNewTodo($event)" />
  <TodoList
    :todos="todos"
    @remove-todo-id="removeTodo($event)"
    @toggle-done-todo="toggleDone($event)"
  >
    <template v-slot:default="slotProps"
      >You have {{ slotProps.elementLeftText }} ({{ slotProps.todosLeft }})
      things TODO!</template
    >
  </TodoList>
</template>

<script>
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    TodoInput,
    TodoList,
  },
  setup() {},
  data() {
    return {
      todos: [
        {
          id: 0,
          done: false,
          text: "Learn Vue 2",
        },
        {
          id: 1,
          done: false,
          text: "Learn Vue 3",
        },
        {
          id: 2,
          done: false,
          text: "Learn Vue 5",
        },
      ],
    };
  },
  methods: {
    onNewTodo(newTodo) {
      this.todos.push({
        id: this.getLastId() + 1,
        done: false,
        text: newTodo,
      });
    },
    getLastId() {
      if (this.todos.length > 0) {
        return this.todos[this.todos.length - 1].id;
      }
      return 0;
    },
    removeTodo(id) {
      this.todos = this.todos.filter((currentTodo) => currentTodo.id !== id);
    },
    toggleDone(id) {
      this.todos = this.todos.map((currentTodo) => {
        if (currentTodo.id === id) {
          return {
            ...currentTodo,
            done: !currentTodo.done,
          };
        }
        return currentTodo;
      });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
