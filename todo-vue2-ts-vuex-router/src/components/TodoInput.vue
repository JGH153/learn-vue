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

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TodoInput extends Vue {
  newTodoText = "";

  onTodoEnter(): void {
    if (this.newTodoText === "") {
      return;
    }
    this.$emit("new-data-event", this.newTodoText);
    this.newTodoText = "";
  }
}
</script>

<style lang="scss" scoped>
.todo-input {
  width: 100%;
  padding: 8px 10px;
  max-width: 500px;
  border: 3px solid black;
  border-radius: 5px;
}
</style>
