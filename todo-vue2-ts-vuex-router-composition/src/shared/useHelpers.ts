import { StoreState } from "@/store/store.state.interface";
import { computed, getCurrentInstance } from "@vue/composition-api";
import { Store } from "vuex";

// requires type to make vuex 3 -> 4 easier
export function useStore<StoreType>(): Store<StoreType> {
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error("must be called in setup");
  }
  const { $store } = "proxy" in vm ? vm.proxy : vm;
  return $store;
}

// should be send store action?
export function useStoreAction(
  store: Store<StoreState>,
  module: string,
  element: string
) {
  return store.dispatch(`${getModulePath(module)}${element}`);
}

// should be send store action?
export function useStoreMutation(
  store: Store<StoreState>,
  module: string,
  element: string,
  value?: any
) {
  if (value) {
    store.commit(`${getModulePath(module)}${element}`, value);
  } else {
    store.commit(`${getModulePath(module)}/${element}`);
  }
}

function getModulePath(module: string | null) {
  if (!module || module.length === 0) {
    return "";
  }
  return module + "/";
}

export function useRoute() {
  const vm = getCurrentInstance();
  if (!vm) throw new Error("must be called in setup");

  return vm.proxy.$route;
}

export function useRouter() {
  const vm = getCurrentInstance();
  if (!vm) throw new Error("must be called in setup");

  return vm.proxy.$router;
}
