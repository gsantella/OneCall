Vue.component('todo-item', {
  template: '\
    <li>\
    <button class="waves-effect waves-light btn" v-on:click="$emit(\'remove\')">X</button>\
      <span class="secondary-content">{{ title }}</span>\
    </li>\
  ',
  props: ['title']
})
new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    numbers: [
      {
        id: 1,
        title: 'Do the dishes',
      },
      {
        id: 2,
        title: 'Take out the trash',
      },
      {
        id: 3,
        title: 'Mow the lawn'
      }
    ],
    nextTodoId: 4
  },
  methods: {
    addNewTodo: function () {
      alert('before add...');
      this.numbers.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    },
    makeCall: function() {
      axios.get('http://172.17.24.52/onecall/number')
    .then(function (response) {
      alert(response);
      data.numbers = response;
    })
    .catch(function (error) {
      alert('axios error');
    });
    }
  }
})
