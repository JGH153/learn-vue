import { ServerTodo } from "@/shared/models/server-todo.interface";
import { Todo } from "@/shared/models/todo.interface";
import { RootMutations } from "@/store/root-store-mutations";
import { RootStoreState } from "@/store/root-store.state.interface";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import { TodosMutations } from "./todos-mutations.enum";
import { TodosStoreState } from "./todos.store.interface";

const initialState: () => TodosStoreState = () => ({
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
});

const state = initialState();

const mutations = <MutationTree<TodosStoreState>>{
  [TodosMutations.ADD_NEW_TODO](state, newTodo: Todo) {
    state.todos = [...state.todos, newTodo];
  },
  [TodosMutations.REMOVE_TODO_BY_ID](state, id: number) {
    state.todos = state.todos.filter(
      (currentTodo: Todo) => currentTodo.id !== id
    );
  },
  [TodosMutations.TOGGLE_DONE](state, id: number) {
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
  [TodosMutations.SET_NEW_TODOS](state, newTodos: Todo[]) {
    state.todos = newTodos;
  },
};

const getters = <GetterTree<TodosStoreState, RootStoreState>>{
  doneTodos: (state) => {
    return state.todos.filter((todo: Todo) => todo.done).length;
  },
  getLastId: (state) => {
    if (state.todos.length > 0) {
      return state.todos[state.todos.length - 1].id;
    }
    return 0;
  },
};

const actions = <ActionTree<TodosStoreState, RootStoreState>>{
  async loadTodos({ commit }) {
    commit(RootMutations.SET_LOADING, true, { root: true });
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
    commit(TodosMutations.SET_NEW_TODOS, mappedTodos);
    commit(RootMutations.SET_LOADING, false, { root: true });
  },
};

export const TodosModules = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
