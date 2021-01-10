import { injectable, action, state, autobind } from "reactant";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

@injectable()
class TodoService {
  @state
  list: Todo[] = [this.createTodo("Use Reactant")];

  createTodo(text: string) {
    return {
      id: `${Math.random()}`,
      text,
      completed: false,
    };
  }

  @autobind
  @action
  add(text: string) {
    this.list.push(this.createTodo(text));
  }

  getItem(id: string) {
    return this.list.find((item) => item.id === id);
  }

  @autobind
  @action
  edit(id: string, text: string) {
    const item = this.getItem(id);
    item.text = text;
  }

  @autobind
  @action
  toggle(id: string) {
    const item = this.getItem(id);
    item.completed = !item.completed;
  }

  @action
  toggleAll(allCompleted: boolean) {
    this.list.forEach((item) => {
      if (item.completed !== !allCompleted) {
        item.completed = !allCompleted;
      }
    });
  }

  @autobind
  @action
  delete(id: string) {
    const index = this.list.findIndex((item) => item.id === id);
    this.list.splice(index, 1);
  }

  @autobind
  @action
  clearCompleted() {
    this.list = this.list.filter((item) => item.completed === false);
  }
}

export { TodoService };
