<template>
  <div id="app">
    <TodoHeader />
    <TodoInput v-on:addTodoEvent="addTodo" />
    <TodoList v-bind:todoItems="todoItems" v-on:removeItemEvent="removeItem" v-on:toggleCompleteEvent="toggleComplete" />
    <TodoFooter v-on:clearAllEvent="clearAll"/>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'

export default {
  name: 'App',
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  },
  data: function() {
    return {
      todoItems: []
    }
  },
   created: function() {
    if(localStorage.length > 0) {
      for(let i=0; i<localStorage.length; i++) {
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
          
        }
      }
    }
  },
  methods: {
    addTodo: function(newTodoItem) {
        let addTodoItem = {completed: false, item: newTodoItem};
        localStorage.setItem(newTodoItem, JSON.stringify(addTodoItem));
        this.todoItems.push(addTodoItem);
    },
    removeItem: function(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleComplete: function(todoItem, index) {
      this.todoItems[index].completed = !this.todoItems[index].completed;      
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAll: function() {
      localStorage.clear();
      this.todoItems = [];
    }
  }
}
</script>

<style>
  body {
    text-align: center;
    background: #F6F6F6;
  }

  input {
    border-style: groove;
    width: 200px;
  }

  button {
    border-style: groove;
  }

  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
  }
</style>
