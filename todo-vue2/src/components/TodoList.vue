<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span @click="toggleDone(todo.id)" :class="{ striked: todo.done }">
          {{ todo.text }}</span
        >
        <button @click="removeItem(todo.id)">X</button>
      </li>
    </ul>
    <div v-if="todos.length === 0">All done!</div>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  props: {
    todos: {
      type: Array,
      required: true
    },
  },
  created: function() {
    console.log("TodoList created with: ", this.todos);
  },
  methods: {
    removeItem(id) {
      this.$emit("remove-todo-id", id);
    },
    toggleDone(id) {
      this.$emit("toggle-done-todo", id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.striked {
  text-decoration: line-through;
}
span {
  cursor: pointer;
}
</style>
