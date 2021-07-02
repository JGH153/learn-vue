<template>
  <div id="app">
    <img alt="Vue logo" src="./../assets/logo.png" />
    <h1>My Vue 2 JS TODO APP!</h1>

    <template v-if="isLoading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </template>

    <template v-if="!isLoading">
      <TodoInput />
      <TodoList>
        <template v-slot:default="slotProps"
          >You have {{ slotProps.todosLeft | numberToText }} things
          TODO!</template
        >
      </TodoList>
      <h3>Comp: last id: {{ getLastId }} | {{ testMe }}</h3>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters, mapState } from "vuex";
import HelloWorld from "./../components/HelloWorld.vue";
import TodoInput from "./../components/TodoInput.vue";
import TodoList from "./../components/TodoList.vue";

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
    ...mapState({
      isLoading: (state: any) => state.isLoading,
    }),
  },
  methods: {
    ...mapActions(["loadTodos"]),
  },
})
export default class App extends Vue {
  // getLastId!: number; //typedef for mapGetters getLastId
  loadTodos!: () => void;

  created(): void {
    // console.log(this.getLastId);
    this.loadTodos();
  }
}
</script>

<style lang="scss" scoped></style>
