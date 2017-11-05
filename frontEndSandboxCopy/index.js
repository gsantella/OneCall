Vue.component('todo-item', {
  template: '\
    <li>\
    <button class="waves-effect waves-light btn" v-on:click="$emit(\'remove\')">X</button>\
      <span class="secondary-content">{{ title }}</span>\
    </li>\
  ',
  props: ['title']
})
var app = new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    numbers: '',
    nextTodoId: 0
  },
  methods: {
    addNewTodo: function () {

      axios.get('http://172.17.24.52/onecall/number/add/' + this.newTodoText)
      .then(function (response) {
        loadNumbers();
      })
      .catch(function (error) {
        alert('axios error');
      });
    },
    makeCall: function() {
      alert('one call sent');
      axios.get('http://172.17.24.52/onecall/send/1')
    .then(function (response) {
      // say one call sent
    })
    .catch(function (error) {
      alert('axios error');
    });
    },
    addNumber: function () {

        console.log(app.$data.numbers[0]);

    },
    deleteNumber: function (num) {
      axios.get('http://172.17.24.52/onecall/number/delete/' + num)
    .then(function (response) {

    })
    .catch(function (error) {
      alert('axios error');
      });
    },
    loadNumbers: function() {
      axios.get('http://172.17.24.52/onecall/number')
      .then(function (response) {
      app.$data.numbers = response.data.numbers;
      app.$data.nextTodoId = response.data.numbers.length + 1;
      })
      .catch(function (error) {
      alert('axios error');
      });
    }
  }
})



app.loadNumbers();
