import { ServerTodo } from "@/shared/models/server-todo.interface";
import { Todo } from "@/shared/models/todo.interface";
import Vue from "vue";
import Vuex from "vuex";
import { TodosModules } from "./modules/todos/todos.store";
import { RootStoreState } from "./root-store.state.interface";

Vue.use(Vuex);

const production = process.env.NODE_ENV === "production";

export default new Vuex.Store({
  strict: !production, // TODO disable in prod
  state: {
    isLoading: false,
  },
  mutations: {
    setLoading(state: RootStoreState, isLoading: boolean) {
      state.isLoading = isLoading;
    },
  },
  actions: {},
  getters: {},
  modules: {
    todo: TodosModules,
  },
});
