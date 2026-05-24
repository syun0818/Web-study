let todoIndex = 0;

export class TodoItemModel {
  //@param (number) id
  //@param (string) title
  //@param (boolean) completed
  id;
  title;
  completed;

  constructor({ title, completed = false }) {
    this.id = todoIndex++;
    this.title = title;
    this.completed = completed;
  }
}
