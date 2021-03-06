import './app.less';

export class TodoAppController {
  /**
   * @param {TodoList} todoList
   */
  constructor(todoList) {
    "ngInject";
    this.todos = todoList;
    this.selected =  null;
  }

  onSave(task) {
    if (!task) return;

    this.todos.add(task);
  }

  onFilter(state) {
    switch (state) {
      case 'all':
        this.todos.showAll();
        break;
      case 'active':
        this.todos.showActive();
        break;
      case 'completed':
        this.todos.showCompleted();
        break;
    }
  }

  onToggleAll() {
    this.todos.toggleAll();
  }
}

export default {
  template: `
    <section class="todoapp">
      <section class="header">
        <h1>MESH01</h1>
        <header class="header-input">
          <todo-text-input
            placeholder="What needs to get done?"
            on-save="$ctrl.onSave(task)">
          </todo-text-input>
        </header>
      </section>
      <section class="main">
        <todo-batch-toggle on-toggle="$ctrl.onToggleAll()" todos="$ctrl.todos.list" ng-if="$ctrl.todos.hasTasks()"></todo-batch-toggle>
        <div class="todo-list" dnd-list="$ctrl.todos.filteredList">
          <todo-item
          todo="todo"
          items="$ctrl.todos.filteredList"
          index="$index"
          selected="$ctrl.selected"
          ng-repeat="todo in $ctrl.todos.filteredList"></todo-item>
        </div>
      </section>
      <todo-footer ng-if="$ctrl.todos.hasTasks()" todos="$ctrl.todos">

      </todo-footer>
    </section>
  `,
  controller: TodoAppController
};
