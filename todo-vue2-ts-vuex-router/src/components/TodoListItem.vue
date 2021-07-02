<template>
  <v-expand-x-transition>
    <div class="list-item-container" v-show="expanded">
      <span
        class="todo-text"
        @click="onToggleDone(todo.id)"
        v-striked="todo.done"
        :class="{ striked: todo.done }"
      >
        {{ todo.text }}</span
      >
      <v-btn class="x-button" elevation="2" @click="removeItem(todo.id)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </v-expand-x-transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapMutations } from "vuex";
import { Todo } from "../shared/models/todo.interface";

@Component({
  methods: {
    ...mapMutations(["toggleDone", "removeTodoById"]),
  },
})
export default class TodoListItem extends Vue {
  toggleDone!: (id: number) => void; //typedef for mapMutations toggleDone
  removeTodoById!: (id: number) => void; //typedef for mapMutations removeTodoById

  @Prop() private todo!: Todo;
  expanded = true;

  removeItem(id: number): void {
    this.expanded = !this.expanded;

    setTimeout(() => {
      this.removeTodoById(id);
    }, 200);
  }
  onToggleDone(id: number): void {
    this.toggleDone(id);
  }
}
</script>

<style lang="scss" scoped>
.striked {
  // text-decoration: line-through; Moved to directive
  color: grey;
}
.todo-text {
  cursor: pointer;
}
.x-button {
  margin: 4px;
  margin-left: 14px;
}
.list-item-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  margin: 8px;
  box-shadow: 5px 5px 7px -1px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  width: 500px;

  padding: 5px 15px;
}
</style>
