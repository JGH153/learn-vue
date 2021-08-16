<template>
  <div>
    <input type="text" class="todo-input" v-model="newTodoText" @keydown.enter="onTodoEnter" autofocus />
  </div>
</template>

<script lang="ts">
import { TodosMutations } from "@/store/modules/todos/todos.mutations.enum";
import { StoreState } from "@/store/store.state.interface";
import { defineComponent, ref } from "@vue/composition-api";
import { Store } from "vuex";
import { useStore, useStoreMutation } from "../shared/useHelpers";

export default defineComponent({
  name: "TodoInput",
  setup() {
    const store = useStore<StoreState>();

    const { newTodoText, onTodoEnter } = useInputTodo(store);
    return { newTodoText, onTodoEnter };
  },
});

function useInputTodo(store: Store<StoreState>) {
  const newTodoText = ref("");
  function onTodoEnter() {
    if (newTodoText.value === "") {
      return;
    }
    onNewTodo(newTodoText.value, store);
    newTodoText.value = "";
  }

  function onNewTodo(newTodoText: string, store: Store<StoreState>): void {
    const newTodoId = store.getters["todo/getLastId"] + 1;
    const newTodo = {
      id: newTodoId,
      done: false,
      text: newTodoText,
    };
    // store.commit("todo/" + TodosMutations.ADD_NEW_TODO, newTodo); // alternative
    useStoreMutation(store, "todo", TodosMutations.ADD_NEW_TODO, newTodo);
  }

  return { newTodoText, onTodoEnter };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.todo-input {
  width: 100%;
  padding: 8px 10px;
  max-width: 500px;
  border: 3px solid black;
  border-radius: 5px;
}
</style>
