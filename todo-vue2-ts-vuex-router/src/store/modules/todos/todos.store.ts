import { ServerTodo } from "@/shared/models/server-todo.interface";
import { Todo } from "@/shared/models/todo.interface";
import { Commit } from "vuex";
import { TodosStoreState } from "./todos.store.interface";

// TODO try divided pattern: https://stackoverflow.com/questions/53807294/how-is-the-correct-way-to-work-with-vuex-and-typescript
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
    addNewTodo(state: TodosStoreState, newTodo: Todo) {
      state.todos = [...state.todos, newTodo];
    },
    removeTodoById(state: TodosStoreState, id: number) {
      state.todos = state.todos.filter((currentTodo: Todo) => currentTodo.id !== id);
    },
    toggleDone(state: TodosStoreState, id: number) {
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
      const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
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
    doneTodos: (state: TodosStoreState) => {
      return state.todos.filter((todo: Todo) => todo.done).length;
    },
    getLastId: (state: TodosStoreState) => {
      if (state.todos.length > 0) {
        return state.todos[state.todos.length - 1].id;
      }
      return 0;
    },
  },
};
