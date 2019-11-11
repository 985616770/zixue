<template>
  <div>
    <div>计算属性</div>
    <div>---------------</div>
    <div>{{ reverseMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mes: 'hello world'
    };
  },
  computed: {
    reverseMessage() {
      return this.mes
        .split('')
        .reverse()
        .join('');
    }
  }
};
</script>
