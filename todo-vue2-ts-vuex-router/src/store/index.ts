import { ServerTodo } from "@/shared/models/server-todo.interface";
import { Todo } from "@/shared/models/todo.interface";
import Vue from "vue";
import Vuex, { ActionTree, GetterTree, MutationTree } from "vuex";
import { TodosModules } from "./modules/todos/todos.store";
import { RootStoreState } from "./root-store.state.interface";

Vue.use(Vuex);

const production = process.env.NODE_ENV === "production";

const initialState: () => RootStoreState = () => ({
  isLoading: false,
});

const state = initialState();

const mutations = <MutationTree<RootStoreState>>{
  setLoading(state, isLoading: boolean) {
    state.isLoading = isLoading;
  },
};

const getters = <GetterTree<RootStoreState, RootStoreState>>{};

const actions = <ActionTree<RootStoreState, RootStoreState>>{};

export default new Vuex.Store<RootStoreState>({
  strict: !production,
  state: {
    ...state,
  },
  mutations,
  actions,
  getters,
  modules: {
    todo: TodosModules,
  },
});
