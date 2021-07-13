import Vue from "vue";
import Vuex, { ActionTree, GetterTree, MutationTree } from "vuex";
import { TodosModules } from "./modules/todos/todos.store";
import { RootMutations } from "./root-store-mutations";
import { RootStoreState } from "./root-store.state.interface";
import { StoreModules } from "./store-modules.enum";

Vue.use(Vuex);

//https://cli.vuejs.org/guide/mode-and-env.html#modes
const production = process.env.NODE_ENV === "production";

const initialState: () => RootStoreState = () => ({
  isLoading: false,
});

const state = initialState();

const mutations = <MutationTree<RootStoreState>>{
  [RootMutations.SET_LOADING](state, isLoading: boolean) {
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
    [StoreModules.Todo]: TodosModules,
  },
});
