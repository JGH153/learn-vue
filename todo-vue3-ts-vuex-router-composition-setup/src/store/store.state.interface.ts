import { TodosStoreState } from "./modules/todos/todos.store.interface";
import { RootStoreState } from "./root-store.state.interface";

// all stores/modules combined
export interface StoreState extends RootStoreState {
  todo: TodosStoreState;
}
