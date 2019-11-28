<template>
  <input
    class="todo-item-input"
    type="text"
    :value="todotext"
    @input="$emit('input',$event.target.value)"
    @keydown.enter="$emit('keydown', $event.target.value)"
    @keydown.esc="$emit('keydown', $event.target.value)"
  />
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'TodoListInput',
  props: {
    todotext: {
      default: '',
    },
  },
};
</script>

<style scoped>
.todo-item-input {
  width: 200px;
  line-height: 2;
  text-indent: 5px;
  border-radius: 3px;
  outline: none;
  border: 1px dashed #aaa;
}
</style>
