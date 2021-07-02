import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// TODO own modules for todo
export default new Vuex.Store({
  state: {
    todos: [
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
    ],
  },
  mutations: {
    addNewTodo(state, newTodo) {
      console.log("adding!");
      state.todos = [...state.todos, newTodo];
    },
  },
  actions: {},
  modules: {},
  getters: {
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done).length;
    },
    getTodoById: (state) => (id: number) => {
      // the result is not cached!
      return state.todos.find((todo) => todo.id === id);
    },
    getLastId: (state) => {
      if (state.todos.length > 0) {
        return state.todos[state.todos.length - 1].id;
      }
      return 0;
    },
  },
});
