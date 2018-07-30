import './todoTextInput.less';

class TodoTextInputController {
  constructor() {
    this.text = this.value || '';
    this.isValidItem = true;
  }

  change(event) {
    if (this.text.length > 24) {
      this.isValidItem = false;
      alert("Maximun item length its exeded")
    } else {
      this.isValidItem = true;
    }
  };

  save() {
    if (this.isValidItem) {
      this.onSave({
        task: this.text
      });

      this.text = '';
    } else {
      alert("Maximun characters are exeded")
    }
  }

  onEscape() {
    this.onSave({
      task: this.value
    });
  }
}

export default {
  bindings: {
    placeholder: '@',
    value: '@',
    onSave: '&'
  },
  template: `
    <form ng-submit="vm.save()">
      <input class="new-todo" autofocus=""
             on-escape="vm.onEscape()"
             ng-model="vm.text"
             ng-change="vm.change($event)"
             placeholder="{{vm.placeholder}}" />
    </form>
  `,
  controller: TodoTextInputController,
  controllerAs: 'vm'
}
