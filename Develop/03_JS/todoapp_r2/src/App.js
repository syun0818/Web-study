import { render } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListView.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListmodel.js";

export class App {
  #todoListView = new TodoListView();
  #todoListModel = new TodoListModel([]);
  #formElement;
  #inputElement;
  #containerElement;
  #todoItemCountElement;

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
    this.#todoListModel.addTodoItem(
      new TodoItemModel({ title, completed: false }),
    );
  }

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * @param {{ id:number, completed: boolean }}
   */
  handleUpdate({ id, completed }) {
    this.#todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{ id: number }}
   */
  handleDelete({ id }) {
    this.#todoListModel.deleteTodo({ id });
  }

  #handleChange = () => {
    const todoItems = this.#todoListModel.getTodoItems();
    const todoListElement = this.#todoListView.createElement(todoItems, {
      // Appに定義したリスナー関数を呼び出す
      onUpdateTodo: ({ id, completed }) => {
        this.handleUpdate({ id, completed });
      },
      onDeleteTodo: ({ id }) => {
        this.handleDelete({ id });
      },
    });
    render(todoListElement, this.#containerElement);
    this.#todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
  };

  #handleSubmit = (event) => {
    event.preventDefault();
    this.handleAdd(this.#inputElement.value);
    this.#inputElement.value = "";
  };

  mount() {
    this.#formElement = document.querySelector("#js-form");
    this.#inputElement = document.querySelector("#js-form-input");
    this.#todoItemCountElement = document.querySelector("#js-todo-count");
    this.#containerElement = document.querySelector("#js-todo-list");

    this.#todoListModel.onChange(this.#handleChange);
    this.#formElement.addEventListener("submit", this.#handleSubmit);
  }

  unmount() {
    this.#todoListModel.offChange(this.#handleChange);
    this.#formElement.removeEventListener("submit", this.#handleSubmit);
  }
}
