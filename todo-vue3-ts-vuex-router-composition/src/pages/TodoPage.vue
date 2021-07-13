<template>
  <div>
    <h1>Todo Details! {{ $route.params.id }}</h1>
    <template v-if="todo">
      <h3>Description: {{ todo.text }}</h3>
    </template>
  </div>
</template>

<script lang="ts">
import { ServerTodo } from "@/shared/models/server-todo.interface";
import { Todo } from "@/shared/models/todo.interface";
import { defineComponent, Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "TodoPage",
  setup() {
    const todo: Ref<Todo> | Ref<null> = ref(null);
    const route = useRoute();

    watch(
      () => route.params.id,
      (newId) => {
        console.log("new:", newId);
        if (newId) {
          loadTodo(+newId);
        }
      },
      { immediate: true }
    );

    async function loadTodo(id: number): Promise<void> {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/" + id
      );
      // make it fake slower
      await new Promise((resolve) => {
        setTimeout(resolve, 300);
      });

      const serverTodo: ServerTodo = await response.json();
      todo.value = {
        id: serverTodo.id,
        text: serverTodo.title,
        done: serverTodo.completed,
      };
    }

    return { todo };
  },
});
</script>

<style lang="scss" scoped></style>
