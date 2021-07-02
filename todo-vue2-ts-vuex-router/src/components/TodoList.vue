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
    {{ test }}
    <h2>You have {{ doneTodos }} done TODO's</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapState } from "vuex";
import { Todo } from "../shared/models/todo.interface";
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
    }),
    ...mapGetters(["doneTodos"]),
  },
  methods: {
    ...mapGetters(["getTodoById"]),
  },
})
export default class TodoList extends Vue {
  // getTodoById!: (id: number) => Todo;
  getTodoById!: any;

  @Prop() private todos!: Todo;

  created(): void {
    console.log(
      "TodoList created with: ",
      this.$store.state.todos,
      "|",
      this.getTodoById()(1),
      this.$store.getters.getTodoById(1)
    );
  }

  // get todosLeft(): number {
  //   if (Array.isArray(this.todos)) {
  //     return this.todos.length;
  //   }
  //   return 0;
  // }
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
