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
    ...mapState({
      // assuming IMyModuleState.items
      todosLeft: (state: any) => state.todos.length,
      // todo state interface
      todos: (state: any) => state.todos,
      isLoading: (state: any) => state.loading,
    }),
    ...mapGetters(["doneTodos"]),
  },
  methods: {
    ...mapGetters([""]),
  },
})
export default class TodoList extends Vue {
  created(): void {
    console.log("TodoList created with: ", this.$store.state.todos);
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
