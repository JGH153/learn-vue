<template>
  <div>
    <input
      type="text"
      class="todo-input"
      v-model="newTodoText"
      @keydown.enter="onTodoEnter"
      autofocus
    />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "TodoInput",
  setup(props, context) {
    const { newTodoText, onTodoEnter } = useInputTodo(context.emit);
    return { newTodoText, onTodoEnter };
  },
};

function useInputTodo(emit) {
  const newTodoText = ref("");
  function onTodoEnter() {
    if (this.newTodoText === "") {
      return;
    }
    emit("new-data-event", newTodoText.value); // what to do here?
    newTodoText.value = "";
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
