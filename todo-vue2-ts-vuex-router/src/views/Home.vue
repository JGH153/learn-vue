<template>
  <div id="app">
    <img alt="Vue logo" src="./../assets/logo.png" />
    <h1>My Vue 2 JS TODO APP!</h1>
    <TodoInput @new-data-event="onNewTodo($event)" />
    <TodoList
      :todos="todos"
      @remove-todo-id="removeTodo($event)"
      @toggle-done-todo="toggleDone($event)"
    >
      <template v-slot:default="slotProps"
        >You have {{ slotProps.todosLeft | numberToText }} things
        TODO!</template
      >
    </TodoList>
    <h3>Comp: {{ getLastId }} | {{ testMe }}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapMutations } from "vuex";
import HelloWorld from "./../components/HelloWorld.vue";
import TodoInput from "./../components/TodoInput.vue";
import TodoList from "./../components/TodoList.vue";
import { Todo } from "../shared/models/todo.interface";

@Component({
  components: {
    HelloWorld,
    TodoInput,
    TodoList,
  },
  computed: {
    ...mapGetters(["getLastId"]),
    testMe() {
      return 55;
    },
  },
  methods: {
    ...mapMutations(["addNewTodo"]),
    // ...mapGetters(["getLastId"]),
  },
})
export default class App extends Vue {
  // getLastId!: () => number; //typedef for mapGetters getLastId
  getLastId!: number; //typedef for mapGetters getLastId
  addNewTodo!: (newTodo: Todo) => void; //typedef for mapMutations addNewTodo
  todos: Todo[] = [
    {
      id: 0,
      done: false,
      text: "Learn Vue 2",
    },
    {
      id: 1,
      done: false,
      text: "Learn Vue 3",
    },
    {
      id: 2,
      done: false,
      text: "Learn Vue 5",
    },
  ];

  created(): void {
    // console.log(this.testMe());
  }

  onNewTodo(newTodoText: string): void {
    const newTodoId = this.getLastId;
    // const newTodoId = this.$store.getters.getLastId();
    // const newTodoId = 5;
    // should be action?
    const newTodo = {
      id: newTodoId,
      done: false,
      text: newTodoText,
    };
    console.log("commit!");
    this.addNewTodo(newTodo);
    // this.$store.commit("addNewTodo", newTodo);
    this.todos.push({
      id: this.getLastIdOld() + 1,
      done: false,
      text: newTodoText,
    });
  }

  getLastIdOld(): number {
    if (this.todos.length > 0) {
      return this.todos[this.todos.length - 1].id;
    }
    return 0;
  }
  removeTodo(id: number): void {
    this.todos = this.todos.filter((currentTodo) => currentTodo.id !== id);
  }
  toggleDone(id: number): void {
    this.todos = this.todos.map((currentTodo) => {
      if (currentTodo.id === id) {
        return {
          ...currentTodo,
          done: !currentTodo.done,
        };
      }
      return currentTodo;
    });
  }
}
</script>

<style lang="scss" scoped></style>
