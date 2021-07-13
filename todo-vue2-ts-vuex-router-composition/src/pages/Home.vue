<template>
  <div id="app">
    <img alt="Vue logo" src="./../assets/logo.png" />
    <h1>My Vue 2 JS TODO APP!</h1>

    <template v-if="isLoading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </template>

    <template v-if="!isLoading">
      <TodoInput />
      <TodoList>
        <template v-slot:default="slotProps"
          >You have {{ slotProps.elementLeftText }} ({{ slotProps.todosLeft }})
          things TODO!</template
        >
      </TodoList>
    </template>
  </div>
</template>

<script lang="ts">
import { Todo } from "@/shared/models/todo.interface";
import { StoreState } from "@/store/store.state.interface";
import {
  computed,
  defineComponent,
  reactive,
  Ref,
  ref,
} from "@vue/composition-api";
import { useStore } from "../shared/useHelpers";
import TodoInput from "../components/TodoInput.vue";
import TodoList from "../components/TodoList.vue";

export default defineComponent({
  components: {
    TodoInput,
    TodoList,
  },
  setup() {
    const store = useStore<StoreState>();
    const { todosList, removeTodo, toggleDone } = useTodoList();
    const { onNewTodo } = useNewTodo(todosList);

    store.dispatch("todo/loadTodos");

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

function useNewTodo(taskList: Ref<Todo[]>) {
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
