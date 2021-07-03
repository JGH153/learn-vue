import { ServerTodo } from "@/shared/models/server-todo.interface";
import { Todo } from "@/shared/models/todo.interface";
import { Commit } from "vuex";

// TODO state interface
export const TodosModules = {
  namespaced: true,
  state: () => ({
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
  }),
  mutations: {
    addNewTodo(state: any, newTodo: Todo) {
      console.log("adding!");
      state.todos = [...state.todos, newTodo];
    },
    removeTodoById(state: any, id: number) {
      state.todos = state.todos.filter(
        (currentTodo: Todo) => currentTodo.id !== id
      );
    },
    toggleDone(state: any, id: number) {
      state.todos = state.todos.map((currentTodo: Todo) => {
        if (currentTodo.id === id) {
          return {
            ...currentTodo,
            done: !currentTodo.done,
          };
        }
        return currentTodo;
      });
    },
    setNewTodos(state: any, newTodos: Todo[]) {
      state.todos = newTodos;
    },
  },
  actions: {
    async loadTodos({ commit }: { commit: Commit }) {
      commit("setLoading", true, { root: true });
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
      commit("setLoading", false, { root: true });
    },
  },
  modules: {},
  getters: {
    doneTodos: (state: any) => {
      return state.todos.filter((todo: Todo) => todo.done).length;
    },
    getLastId: (state: any) => {
      if (state.todos.length > 0) {
        return state.todos[state.todos.length - 1].id;
      }
      return 0;
    },
  },
};
