export class TodoListModel {
  //@param (array) todoItems
  #items;
  constructor(items = []) {
    this.#items = items;
  }
  #listeners = new Map();
  /**
   * 指定したイベントが実行されたときに呼び出されるリスナー関数を登録する
   * @param {string} type イベント名
   * @param {Function} listener イベントリスナー
   */
  addEventListener(type, listener) {
    if (!this.#listeners.has(type)) {
      this.#listeners.set(type, new Set());
    }
    this.#listeners.get(type).add(listener);
  }

  /**
   * TodoItemの合計個数を返す
   * @returns {number}
   */
  getTotalCount() {
    return this.#items.length;
  }

  /**
   * 表示できるTodoItemの配列を返す
   * @returns {TodoItemModel[]}
   */
  getTodoItems() {
    return this.#items;
  }
  onChange(listener) {
    this.addEventListener("change", listener);
  }
  addTodo(todoItem) {
    this.#items.push(todoItem);
    // 指定したイベントに対応するSetを取り出し、すべてのリスナー関数を呼び出す
    const listenerSet = this.#listeners.get("change");
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach((listener) => {
      listener.call(this);
    });
  }
}
