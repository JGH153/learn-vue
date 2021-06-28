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
    <h2><slot v-bind:todosLeft="todosLeft"></slot></h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Todos } from "../shared/models/todos.interface";
import TodoListItem from "./TodoListItem.vue";

@Component({
  components: {
    TodoListItem,
  },
})
export default class TodoList extends Vue {
  @Prop() private todos!: Todos;
  
  created() {
    console.log("TodoList created with: ", this.todos);
  }

  get todosLeft() {
    if (Array.isArray(this.todos)) {
      return this.todos.length;
    }
    return 0;
  }
}
</script>

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
