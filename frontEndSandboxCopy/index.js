Vue.component('todo-item', {
  template: '\
    <li>\
    <button class="waves-effect waves-light btn deleteBtn" v-on:click="$emit(\'remove\')">X</button>\
      <span class="secondary-content">{{ formattedNumber }}</span>\
    </li>\
  ',
  props: ['title'],
  computed: {
    formattedNumber: function() {
      var areaCode = this.title.substring(0, 3);
      var prefix = this.title.substring(3, 6);
      var lineNumber = this.title.substring(6, 10);
      return areaCode + '-' + prefix + '-' + lineNumber ;
    }
  }
})
var app = new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    newTodoTextToDisplay: '',
    numbers: [
      {title: '8785557723'},
      {title: '8785557723'},
      {title: '8785557723'},
      {title: '8785557723'},
      {title: '8785557723'},
      {title: '8785557723'},
      {title: '8785557723'},
      {title: '8785557723'},
      {title: '8785557723'},
      {title: '8785557723'},
      {title: '8785557723'},
      {title: '8785557723'},
      {title: '8785557723'},
      {title: '8785557723'},
      {title: '8785557723'},
      {title: '8785557723'},
      {title: '8785557723'}
    ],
    nextTodoId: 0
  },
  methods: {

    addDashes: function (title) {
      var str = title;
      str.substring(3,'-');
      return str;
    },

    addNewTodo: function () {

      axios.get('http://172.17.24.52/onecall/number/add/' + this.newTodoText)
      .then(function (response) {

      })
        .catch(function (error) {
        alert('axios error');

      app.loadNumbers();
      this.newTodoText = '';
    })
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
//app.loadNumbers();
