<template>
  <v-expand-x-transition>
    <div class="list-item-container" v-show="expanded">
      <span
        class="todo-text"
        @click="toggleDone(todo.id)"
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

<script>
export default {
  name: "TodoListItem",
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {
      expanded: true,
    };
  },
  methods: {
    removeItem(id) {
      this.expanded = !this.expanded;

      setTimeout(() => {
        this.$emit("remove-todo-id", id);
      }, 200);
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
