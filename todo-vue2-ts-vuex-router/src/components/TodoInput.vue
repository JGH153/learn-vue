<template>
  <div>
    <input type="text" class="todo-input" v-model="newTodoText" @keydown.enter="onTodoEnter" autofocus />
  </div>
</template>

<script lang="ts">
import { Todo } from "@/shared/models/todo.interface";
import { TodosMutations } from "@/store/modules/todos/todos-mutations.enum";
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapMutations } from "vuex";

@Component({
  computed: {
    ...mapGetters("todo", ["getLastId"]),
  },
  methods: {
    ...mapMutations("todo", [TodosMutations.ADD_NEW_TODO]),
  },
})
export default class TodoInput extends Vue {
  getLastId!: number; //typedef for mapGetters getLastId
  addNewTodo!: (newTodo: Todo) => void; //typedef for mapMutations addNewTodo

  newTodoText = "";

  onTodoEnter(): void {
    console.log(this);
    if (this.newTodoText === "") {
      return;
    }
    this.onNewTodo(this.newTodoText);
    this.newTodoText = "";
  }

  onNewTodo(newTodoText: string): void {
    const newTodoId = this.getLastId + 1;
    const newTodo = {
      id: newTodoId,
      done: false,
      text: newTodoText,
    };
    this.addNewTodo(newTodo);
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
