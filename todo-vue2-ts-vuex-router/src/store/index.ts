import { ServerTodo } from "@/shared/models/server-todo.interface";
import { Todo } from "@/shared/models/todo.interface";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// TODO own modules for todo
export default new Vuex.Store({
  strict: true, // TODO disable in prod
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
    isLoading: false,
  },
  mutations: {
    addNewTodo(state, newTodo) {
      console.log("adding!");
      state.todos = [...state.todos, newTodo];
    },
    removeTodoById(state, id) {
      state.todos = state.todos.filter((currentTodo) => currentTodo.id !== id);
    },
    toggleDone(state, id) {
      state.todos = state.todos.map((currentTodo) => {
        if (currentTodo.id === id) {
          return {
            ...currentTodo,
            done: !currentTodo.done,
          };
        }
        return currentTodo;
      });
    },
    setLoading(state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    setNewTodos(state, newTodos: Todo[]) {
      state.todos = newTodos;
    },
  },
  actions: {
    async loadTodos({ commit, state }) {
      commit("setLoading", true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/"
      );
      // make it fake slower
      await new Promise((resolve) => {
        setTimeout(resolve, 300);
      });

      const todos: ServerTodo[] = await response.json();
      const mappedTodos: Todo[] = todos.map((current) => {
        return {
          id: current.id,
          text: current.title,
          done: current.completed,
        };
      });
      commit("setNewTodos", mappedTodos);
      commit("setLoading", false);
    },
  },
  modules: {},
  getters: {
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done).length;
    },
    getLastId: (state) => {
      if (state.todos.length > 0) {
        return state.todos[state.todos.length - 1].id;
      }
      return 0;
    },
  },
});
