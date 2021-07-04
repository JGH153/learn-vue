<template>
  <div>
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="list-item">
        <TodoListItem :todo="todo" />
      </li>
    </ul>
    <div v-if="todos.length === 0">All done!</div>
    <h2><slot v-bind:todosLeft="todosLeft"></slot></h2>
    {{ test }}
    <h2>You have {{ doneTodos }} done TODO's</h2>
  </div>
</template>

<script lang="ts">
import { RootStoreState } from "@/store/root-store.state.interface";
import { StoreState } from "@/store/store.state.interface";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapState } from "vuex";
import TodoListItem from "./TodoListItem.vue";

@Component({
  components: {
    TodoListItem,
  },
  computed: {
    test() {
      return "Another computed!";
    },
    ...mapState<StoreState>({
      // assuming IMyModuleState.items
      todosLeft: (state: StoreState) => state.todo.todos.length,
      // todo state interface
      todos: (state: StoreState) => state.todo.todos,
    }),
    ...mapState<RootStoreState>({
      isLoading: (state: RootStoreState) => state.isLoading,
    }),
    ...mapGetters("todo", ["doneTodos"]),
  },
})
export default class TodoList extends Vue {
  created(): void {
    console.log("TodoList created with: ", this.$store.state.todo.todos);
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
