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

<script lang="ts">
import { StoreState } from "@/store/store.state.interface";
import { computed, defineComponent } from "@vue/composition-api";
import { Store } from "vuex";
import { useStore } from "../shared/useHelpers";
import TodoListItem from "./TodoListItem.vue";
export default defineComponent({
  name: "TodoList",
  components: {
    TodoListItem,
  },

  setup() {
    const store = useStore<StoreState>();

    const todos = computed(() => store.state.todo.todos);

    const { todosLeft, elementLeftText } = useElementsLeft(store);
    console.log("TodoList created with: ", todos.value);
    return { todosLeft, elementLeftText, todos };
  },
});

function useElementsLeft(store: Store<StoreState>) {
  const todosLeft = computed(() => store.state.todo.todos.length);

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
