<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <h1>My Vue 3 TS TODO APP!</h1>

  <div class="loader" v-if="isLoading"></div>

  <template v-if="!isLoading">
    <TodoInput />
    <TodoList>
      <template v-slot:default="slotProps"
        >You have {{ slotProps.elementLeftText }} ({{ slotProps.todosLeft }})
        things TODO!</template
      >
    </TodoList>
  </template>
</template>

<script lang="ts">
import { StoreState } from "@/store/store.state.interface";
import { computed, defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import TodoInput from "../components/TodoInput.vue";
import TodoList from "../components/TodoList.vue";

// no more class components, as they are soft depricated
export default defineComponent({
  components: {
    TodoInput,
    TodoList,
  },
  setup() {
    const store = useStore<StoreState>();
    const { todosList, removeTodo, toggleDone } = useTodoList();
    const { onNewTodo } = useNewTodo(todosList);

    // store.dispatch("todo/loadTodos");

    return {
      todosList,
      removeTodo,
      toggleDone,
      onNewTodo,
      isLoading: computed(() => store.state.isLoading),
    };
  },
});

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

  function removeTodo(id: number): void {
    todosList.value = todosList.value.filter(
      (currentTodo) => currentTodo.id !== id
    );
  }
  function toggleDone(id: number): void {
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

function useNewTodo(taskList: any) {
  function getLastId() {
    if (taskList.value.length > 0) {
      return taskList.value[taskList.value.length - 1].id;
    }
    return 0;
  }

  function onNewTodo(newText: string) {
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

<style lang="scss" scoped>
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin: auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
