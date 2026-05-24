import { element, render } from "./view/html-util.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";

export class App {
  #todoListModel = new TodoListModel();
  mount() {
    const formElement = document.querySelector("#js-form");
    const formInputElement = document.querySelector("#js-form-input");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    const todoListContainerElement = document.querySelector("#js-todo-list");

    this.#todoListModel.onChange(() => {
      const todoListElement = element`<ul></ul>`;
      const todoItems = this.#todoListModel.getTodoItems();
      todoItems.forEach((item) => {
        const todoItemElement = element`<li>${item.title}</li>`;
        todoListElement.appendChild(todoItemElement);
      });
      render(todoListElement, todoListContainerElement);
      todoItemCountElement.textContent = `Todoアイテム数： ${this.#todoListModel.getTotalCount()}`;
    });

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      if (formInputElement.value === "") {
        return;
      }
      this.#todoListModel.addTodo(
        new TodoItemModel({
          title: formInputElement.value,
          completed: false,
        }),
      );
      formInputElement.value = "";
    });

    /*
    const todoListElement = element`<ul></ul>`;
    let todoItemCount = 0;

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      if (formInputElement.value === "") {
        return;
      }
      const todoItem = new TodoItemModel(formInputElement.value);
      const todoItemElement = element`<li>${todoItem.title}</li>`;
      todoListElement.appendChild(todoItemElement);
      render(todoListElement, todoListContainerElement);
      formInputElement.value = "";
      todoItemCount++;
      todoItemCountElement.textContent = `Todoアイテム数： ${todoItemCount}`;
    });*/
  }
}
