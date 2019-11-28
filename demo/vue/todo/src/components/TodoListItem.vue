<template>
  <p class="todo-item" :todo="todo">
    <button
      class="todo-item-button_com"
      @click="$emit('click', $event)"
    ></button>
    {{ todo.text }}
    <button class="todo-item-button_del" @click="$emit('dele', todo.id)">
      X
    </button>
  </p>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.todo-item {
  text-indent: 17px;
  width: 200px;
  position: relative;
  font-size: 19px;
  border-bottom: 1px dashed #000;
  vertical-align: center;
}
.todo-item-button_com {
  position: absolute;
  top: 5px;
  left: 1px;
  border-radius: 50%;
  border: none;
  background-color: #fff;
  width: 15px;
  height: 15px;
  padding: 0;
  color: #fff;
  outline: none;
  box-shadow: 0 0 0 2px inset #000;
}
.todo-item-button_com.active {
  background-color: rgb(41, 86, 191);
}
.todo-item-button_del {
  position: absolute;
  right: 0;
  border-radius: 50%;
  border: none;
  background-color: #000;
  width: 20px;
  height: 20px;
  color: #fff;
  line-height: 20px;
}
</style>
