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
    <h2><slot :todosLeft="todosLeft"></slot></h2>
  </div>
</template>

<script>
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
  created: function() {
    console.log("TodoList created with: ", this.todos);
  },
  computed: {
    todosLeft: function() {
      if (Array.isArray(this.todos)) {
        return this.todos.length;
      }
      return 0;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.todo-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  list-style-type: none;
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
