<template>
  <v-expand-x-transition>
    <div class="list-item-container" v-show="expanded">
      <span
        class="todo-text"
        @click="toggleDone(todo.id)"
        :class="{ striked: todo.done }"
      >
        {{ todo.text }}</span
      >
      <router-link :to="'/todo/' + todo.id">Open</router-link>
      <v-btn class="x-button" elevation="2" @click="removeItem(todo.id)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </v-expand-x-transition>
</template>

<script lang="ts">
import { Todo } from "@/shared/models/todo.interface";
import { TodosMutations } from "@/store/modules/todos/todos-mutations.enum";
import { StoreModules } from "@/store/store-modules.enum";
import { StoreState } from "@/store/store.state.interface";
import { defineComponent, PropType, ref } from "@vue/composition-api";
import { useStore, useStoreMutation } from "../shared/useHelpers";

export default defineComponent({
  name: "TodoListItem",
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true,
    },
  },
  setup() {
    const store = useStore<StoreState>();
    const expanded = ref(true);

    function removeItem(id: number) {
      expanded.value = !expanded.value;

      setTimeout(() => {
        // store.commit("todo/" + TodosMutations.REMOVE_TODO_BY_ID, id); // alternative
        useStoreMutation(
          store,
          StoreModules.Todo,
          TodosMutations.REMOVE_TODO_BY_ID,
          id
        );
      }, 200);
    }
    function toggleDone(id: number) {
      // store.commit("todo/" + TodosMutations.TOGGLE_DONE, id); // alternative
      useStoreMutation(
        store,
        StoreModules.Todo,
        TodosMutations.TOGGLE_DONE,
        id
      );
    }

    return { expanded, removeItem, toggleDone };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.striked {
  text-decoration: line-through;
  color: grey;
}
.todo-text {
  cursor: pointer;
}
.x-button {
  margin: 4px;
  margin-left: 14px;
}
.list-item-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  margin: 8px;
  box-shadow: 5px 5px 7px -1px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  width: 500px;

  padding: 5px 15px;
}
</style>
