import React from "react";
import {
  ViewModule,
  injectable,
  useConnector,
  computed,
  state,
  autobind,
  action,
} from "reactant";
import { TodoService } from "./todo.service";
import { Header } from "./components/Header";
import { List } from "./components/List";
import { Footer } from "./components/Footer";

const filters = ["All", "Active", "Completed"] as const;

export type Filters = typeof filters;

export type VisibilityFilter = Filters[number];

@injectable()
class AppView extends ViewModule {
  constructor(public todo: TodoService) {
    super();
  }

  filters = filters;

  @state
  visibilityFilter: VisibilityFilter = "All";

  @autobind
  @action
  setVisibilityFilter(filter: VisibilityFilter) {
    this.visibilityFilter = filter;
  }

  @computed(({ visibilityFilter, todo }: AppView) => [
    visibilityFilter,
    todo.list,
  ])
  get filteredList() {
    return this.todo.list.filter(
      (item) =>
        (this.visibilityFilter === "Active" && !item.completed) ||
        (this.visibilityFilter === "Completed" && item.completed) ||
        this.visibilityFilter === "All"
    );
  }

  @computed(({ todo }: AppView) => [todo.list])
  get completedTodoList() {
    return this.todo.list.filter((item) => item.completed);
  }

  @computed(({ todo, completedTodoList }: AppView) => [todo, completedTodoList])
  get allSelected() {
    return (
      this.todo.list.length > 0 &&
      this.completedTodoList.length === this.todo.list.length
    );
  }

  @computed(({ todo }: AppView) => [todo.list])
  get activeCount() {
    return this.todo.list.filter(({ completed }) => !completed).length;
  }

  get completedCount() {
    return this.todo.list.length - this.activeCount;
  }

  onToggleAll = () => this.todo.toggleAll(this.allSelected);

  component() {
    const data = useConnector(() => ({
      filteredList: this.filteredList,
      allSelected: this.allSelected,
      visibilityFilter: this.visibilityFilter,
    }));
    return (
      <div>
        <Header onAdd={this.todo.add} />
        <List
          filteredList={data.filteredList}
          allSelected={data.allSelected}
          onToggleAll={this.onToggleAll}
          onEdit={this.todo.edit}
          onToggle={this.todo.toggle}
          onDelete={this.todo.delete}
        />
        <Footer
          activeCount={this.activeCount}
          completedCount={this.completedCount}
          filters={this.filters}
          visibilityFilter={data.visibilityFilter}
          onClearCompleted={this.todo.clearCompleted}
          onSetVisibilityFilter={this.setVisibilityFilter}
        />
      </div>
    );
  }
}

export { AppView };
