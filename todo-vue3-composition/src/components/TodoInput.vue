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
export default {
  name: "TodoInput",
  data() {
    return {
      newTodoText: "",
    };
  },
  methods: {
    onTodoEnter() {
      if (this.newTodoText === "") {
        return;
      }
      this.$emit("new-data-event", this.newTodoText);
      this.newTodoText = "";
    },
  },
};
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
