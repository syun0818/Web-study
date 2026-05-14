import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

export class App {
  // 1. TodoListModelの初期化
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
    const trimmedTitle = title.trim();
    if (trimmedTitle === "") {
      return;
    }
    this.#todoListModel.addTodo(
      new TodoItemModel({ title: trimmedTitle, completed: false }),
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
    // それぞれのTodoItem要素をtodoListElement以下へ追加する
    const todoItems = this.#todoListModel.getTodoItems();
    // todoItemsに対応するTodoListViewを作成する
    const todoListElement = this.#todoListView.createElement(todoItems, {
      // Todoアイテムが更新イベントを発生したときに呼ばれるリスナー関数
      onUpdateTodo: ({ id, completed }) => {
        this.handleUpdate({ id, completed });
      },
      // Todoアイテムが削除イベントを発生したときに呼ばれるリスナー関数
      onDeleteTodo: ({ id }) => {
        this.handleDelete({ id });
      },
    });
    // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
    render(todoListElement, this.#containerElement);
    // アイテム数の表示を更新
    this.#todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
  };

  #handleSubmit = (event) => {
    event.preventDefault();
    // 新しいTodoItemをTodoListへ追加する
    this.handleAdd(this.#inputElement.value);
    this.#inputElement.value = "";
  };

  mount() {
    this.#formElement = document.querySelector("#js-form");
    this.#inputElement = document.querySelector("#js-form-input");
    this.#containerElement = document.querySelector("#js-todo-list");
    this.#todoItemCountElement = document.querySelector("#js-todo-count");

    // 2. TodoListModelの状態が更新されたら表示を更新する
    this.#todoListModel.onChange(this.#handleChange);
    // 3. フォームを送信したら、新しいTodoItemModelを追加する
    this.#formElement.addEventListener("submit", this.#handleSubmit);
  }

  unmount() {
    this.#todoListModel.removeEventListener("change", this.#handleChange);
    this.#formElement.removeEventListener("submit", this.#handleSubmit);
  }
}
