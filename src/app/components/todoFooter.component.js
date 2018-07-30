
class TodoFooterController {
  /**
   * @param {TodoList} todoList
   */
  constructor(todoList) {
    "ngInject";
    this.todos = todoList;
  }

  clearCompleted() {
    this.todos.clearCompleted();
  }
}

export default {
  bindings: {},
  transclude: true,
  template: `
    <footer class="footer">
      <span class="todo-count">
        {{vm.todos.countPending()}} {{vm.todos.countPending() == 1 ? 'item' : 'items'}}
      </span>
      <ng-transclude></ng-transclude>
      <button
        class="clear-completed"
        ng-click="vm.clearCompleted()">
        Clear All
      </button>
    </footer>
  `,
  controller: TodoFooterController,
  controllerAs: 'vm'
}
