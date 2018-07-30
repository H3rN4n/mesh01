import cuid from 'cuid';
//import 'core-js/modules/es6.array.find';

export default class TodoList {

  constructor($webSql) {
    this.filterState = 'all';
    this.filteredList = this.list = [];
    this.db = $webSql.openDatabase('Mesh01', '1.0', 'Mesh01', 2 * 1024 * 1024);
    // this.db.dropTable('list');
    this.createTable();

    // this.db.bulkInsert('todos', this.todoList).then(function(results) {
    //   console.log(results.insertId);
    // })

    this.db.selectAll("list").then((results) => {
      this.list = [];
      for (var i = 0; i < results.rows.length; i++) {
        this.list.push(results.rows.item(i));
        this.filteredList.push(results.rows.item(i));
      }
    })
  }

  add(description) {
    const task = new Task(description);
    this.list.push(task);
    this.$refreshList();

    console.log(task)
    this.db.insert('list', task).then(function (results) {
      console.log(results.insertId);
    })

    return task;
  }

  toggleAll() {
    const complete = this.countPending() !== 0;
    this.list = this.list.map((task) => {
      task.complete = !!complete;

      return task;
    });

    this.$filter();
  }

  createTable() {
    this.db.createTable('list', {
      "id": {
        "type": "TEXT",
        "null": "NOT NULL", // default is "NULL" (if not defined)
        "primary": true, // primary
      },
      "created": {
        "type": "TIMESTAMP",
        "null": "NOT NULL",
        "default": "CURRENT_TIMESTAMP" // default value
      },
      "description": {
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "isCompleted": {
        "type": "TEXT",
        "null": "NOT NULL"
      }
    })
  }

  toggleStatus(task) {
    task.complete = !task.complete;
    this.db.del("list", {
      "id": item.id,
      'complete': task.complete
    })
    this.$filter();
  }

  remove(item) {
    this.list = this.list.filter((todo) => todo !== item);
    this.db.del("list", {
      "id": item.id
    })
    this.$filter();
  }

  clearCompleted() {
    this.list = this.list.filter((todo) => !todo.complete);
    this.db.dropTable('list');
    this.list = [];
    this.createTable();
    this.$filter();
  }

  showCompleted() {
    this.filterState = 'completed';
    this.$filter();
  }

  showActive() {
    this.filterState = 'active';
    this.$filter();
  }

  showAll() {
    this.filterState = 'all';
    this.$filter();
  }

  $filter(filterState = this.filterState) {
    this.filterState = filterState;
    const showAll = ('all' === filterState);
    const showCompleted = 'completed' === filterState;

    this.filteredList = this.list.filter((item) => (showAll || showCompleted === item.complete));
  }

  countPending() {
    return this.list.filter((item) => !item.complete).length;
  }

  countCompleted() {
    return this.list.filter((item) => item.complete).length;
  }

  hasTasks() {
    return 0 !== this.list.length;
  }

  $refreshList() {
    this.$filter();
  }

}

class Task {
  constructor(description) {
    this.id = cuid();
    this.description = description;
    this.isCompleted = false;
  }

  get complete() {
    return this.isCompleted;
  }

  set complete(val) {
    this.isCompleted = !!val;
  }
}
