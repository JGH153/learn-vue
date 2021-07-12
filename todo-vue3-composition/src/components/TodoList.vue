<template>
  <div>
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="list-item">
        <TodoListItem
          :todo="todo"
          @remove-todo-id="$emit('remove-todo-id', $event)"
          @toggle-done-todo="$emit('toggle-done-todo', $event)"
        />
      </li>
    </ul>
    <div v-if="todos.length === 0">All done!</div>
    <h2>
      <slot :todosLeft="todosLeft" :elementLeftText="elementLeftText"></slot>
    </h2>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import TodoListItem from "./TodoListItem.vue";
export default {
  name: "TodoList",
  components: {
    TodoListItem,
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const { todosLeft, elementLeftText } = useElementsLeft(props.todos);
    console.log("TodoList created with: ", props.todos);
    return { todosLeft, elementLeftText };
  },
};

function useElementsLeft(todos) {
  const todosLeft = computed(() => {
    if (Array.isArray(todos)) {
      return todos.length;
    }
    return 0;
  });
  const elementLeftText = computed(() => {
    if (isNaN(todosLeft.value) || todosLeft.value < 0 || todosLeft.value >= 10)
      return todosLeft.value;
    const texts = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    return texts[todosLeft.value].toLowerCase();
  });

  return { todosLeft, elementLeftText };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.todo-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  list-style-type: none;
  padding-inline-start: 0px;
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
