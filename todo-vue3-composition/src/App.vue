<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>My Vue 3 JS TODO APP!</h1>
  <TodoInput @new-data-event="onNewTodo($event)" />
  <TodoList
    :todos="todosList"
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
// TODO fix/remove
/* eslint-disable no-unused-vars */
import { reactive, ref } from "@vue/reactivity";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    TodoInput,
    TodoList,
  },
  setup() {
    const { todosList, removeTodo, toggleDone } = useTodoList();
    const { onNewTodo } = useNewTodo(todosList);

    return { todosList, removeTodo, toggleDone, onNewTodo };
  },
};

// all these function could be in there own file exported and re-used elsewhere
function useTodoList() {
  const todosList = ref([
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
  ]);

  function removeTodo(id) {
    todosList.value = todosList.value.filter(
      (currentTodo) => currentTodo.id !== id
    );
  }
  function toggleDone(id) {
    todosList.value = todosList.value.map((currentTodo) => {
      if (currentTodo.id === id) {
        return {
          ...currentTodo,
          done: !currentTodo.done,
        };
      }
      return currentTodo;
    });
  }

  return { todosList, removeTodo, toggleDone };
}

function useNewTodo(taskList) {
  function getLastId() {
    if (taskList.value.length > 0) {
      return taskList.value[taskList.value.length - 1].id;
    }
    return 0;
  }

  function onNewTodo(newText) {
    taskList.value.push(
      reactive({
        id: getLastId() + 1,
        done: false,
        text: newText,
      })
    );
  }

  return { onNewTodo };
}
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
