//ユニークなIDを管理する変数
let todoIndex = 0;

export class TodoItemModel {
  /**@type{number} TodoアイテムのID */
  id;
  /**@type{string} Todoアイテムのタイトル */
  title;
  /**@type{boolean} Todoアイテムが完了ならtrue そうでないならfalse */
  completed;

  /**
   * @param {{title: string, completed: boolean}}
   */
  constructor({ title, completed }) {
    //IDは連番となり、それぞれのインスタンスごとにことなる
    this.id = todoIndex++;
    this.title = title;
    this.completed = completed;
  }
}
