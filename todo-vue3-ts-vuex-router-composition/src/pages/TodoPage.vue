<template>
  <div>
    <h1>Todo Details! {{ $route.params.id }}</h1>
    <template v-if="todo">
      <h3>Description: {{ todo.text }}</h3>
    </template>
  </div>
</template>

<script lang="ts">
// import { ServerTodo } from "@/shared/models/server-todo.interface";
// import { Todo } from "@/shared/models/todo.interface";
// import { Component, Vue, Watch } from "vue-property-decorator";
// import { Route } from "vue-router";

// @Component
// export default class TodoPage extends Vue {
//   todo: Todo | null = null; // cant be undefined

//   @Watch("$route", { immediate: true, deep: true })
//   onUrlChange(newVal: Route): void {
//     console.log("route!", newVal);
//     this.loadTodo(+newVal.params["id"]);
//   }

//   async loadTodo(id: number): Promise<void> {
//     const response = await fetch("https://jsonplaceholder.typicode.com/todos/" + id);
//     // make it fake slower
//     await new Promise((resolve) => {
//       setTimeout(resolve, 300);
//     });

//     const serverTodo: ServerTodo = await response.json();
//     this.todo = {
//       id: serverTodo.id,
//       text: serverTodo.title,
//       done: serverTodo.completed,
//     };
//   }
// }
</script>

<style lang="scss" scoped></style>
