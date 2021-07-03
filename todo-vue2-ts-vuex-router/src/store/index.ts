import { ServerTodo } from "@/shared/models/server-todo.interface";
import { Todo } from "@/shared/models/todo.interface";
import Vue from "vue";
import Vuex from "vuex";
import { TodosModules } from "./modules/todos";

Vue.use(Vuex);

// TODO own modules for todo
export default new Vuex.Store({
  strict: true, // TODO disable in prod
  state: {
    isLoading: false,
  },
  mutations: {
    setLoading(state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
  },
  actions: {},
  getters: {},
  modules: {
    todo: TodosModules,
  },
});
