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

      axios.post('http://172.17.24.52/onecall/number', {
        num: this.newToDoText
      })
    .then(function (response) {
      alert(response);
      app.$data.numbers = response;
    })
    .catch(function (error) {
      alert('axios error');
    });
      this.numbers.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
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
    deleteNumber: function (title) {
      var number = {};
      number.title = title;
      axios.delete('http://172.17.24.52/onecall/number', number)
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
