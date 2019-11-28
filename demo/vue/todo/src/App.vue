<template>
  <div id="app">
    <h1 style="color:red">Todo List</h1>
    <todo-list-input
      :todotext="value"
      @keydown="addItem"
      @input="value = $event"
    />

    <div>
      <todo-list-item
        v-for="item in todos"
        :key="item.id"
        :todo="item"
        @dele="dele"
        @click="addClass"
      />
    </div>
  </div>
</template>

<script>
import TodoListInput from './components/TodoListInput';
import TodoListItem from './components/TodoListItem';

export default {
  name: 'app',
  components: {
    TodoListInput,
    TodoListItem,
  },
  data() {
    return {
      value: '',
      newValue: '',
      id: 0,
      todos: [
        { text: '123', id: -1 },
        { text: '123', id: -2 },
      ],
    };
  },
  methods: {
    addItem(text) {
      this.todos.push({
        text: text,
        id: this.id++,
      });
      this.value = '';
    },
    dele(e) {
      this.todos = this.todos.filter((v) => v.id !== e);
    },
    addClass($event) {
      $event.target.classList.toggle('active');
    },
  },
};
</script>

<style>
#app {
  margin-top: 20%;
  /* width: 1000px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
