<template>
  <div>
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="list-item">
        <span
          class="todo-text"
          @click="toggleDone(todo.id)"
          :class="{ striked: todo.done }"
        >
          {{ todo.text }}</span
        >
        <v-btn class="x-button" elevation="2" @click="removeItem(todo.id)"
          >X</v-btn
        >
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
      required: true,
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
.todo-text {
  cursor: pointer;
}
.x-button {
  margin: 4px;
  margin-left: 14px;
}
.list-item {
  margin: 8px;
  box-shadow: 5px 5px 7px -1px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  width: 500px;

  padding: 5px 15px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
.todo-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  list-style-type: none;
}
</style>
