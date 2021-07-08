<template>
  <div id="app">
    <img alt="Vue logo" src="./../assets/logo.png" />
    <h1>My Vue 2 JS TODO APP!</h1>

    <template v-if="isLoading">
      <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
    </template>

    <template v-if="!isLoading">
      <TodoInput />
      <TodoList>
        <template v-slot:default="slotProps">You have {{ slotProps.todosLeft | numberToText }} things TODO!</template>
      </TodoList>
      <h3>Comp: last id: {{ getLastId }} | {{ testMe }} | {{ someValue }}</h3>
      <h3 v-if="myBookType === BookType.Documentation">My book is documentation!</h3>
    </template>
  </div>
</template>

<script lang="ts">
import { BookType } from "@/shared/models/enums/book-type.enum";
import { RootStoreState } from "@/store/root-store.state.interface";
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapActions, mapGetters, mapState } from "vuex";
import TodoInput from "./../components/TodoInput.vue";
import TodoList from "./../components/TodoList.vue";

// type of Home so someValue can access class values
@Component<Home>({
  components: {
    TodoInput,
    TodoList,
  },
  computed: {
    ...mapGetters("todo", ["getLastId"]),
    testMe() {
      return 55;
    },
    someValue() {
      return this.someCompValue;
    },
    ...mapState<RootStoreState>({
      isLoading: (state: RootStoreState) => state.isLoading,
    }),
  },
  methods: {
    ...mapActions("todo", ["loadTodos"]),
  },
})
export default class Home extends Vue {
  // getLastId!: number; //typedef for mapGetters getLastId
  loadTodos!: () => void;
  readonly BookType = BookType; // can now use enum in template

  myBookType = BookType.Documentation;
  someCompValue = "A value";

  @Watch("isLoading")
  onIsLoadingChanged(value: string, oldValue: string): void {
    console.log("change!", value, oldValue);
  }

  created(): void {
    this.loadTodos();
  }
}
</script>

<style lang="scss" scoped></style>
