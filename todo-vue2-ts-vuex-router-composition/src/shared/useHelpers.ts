import { getCurrentInstance } from "@vue/composition-api";
import { Store } from "vuex";

export function useStore<StoreType>(): Store<StoreType> {
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error("must be called in setup");
  }
  const { $store } = "proxy" in vm ? vm.proxy : vm;
  return $store;
}

export function useRoute() {
  const vm = getCurrentInstance();
  if (!vm) throw new Error("must be called in setup");

  return vm.proxy.$route;
}
