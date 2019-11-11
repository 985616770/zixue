<template>
  <div :style="{ color: col }"> {{ time }}</div>
</template>

<script>
export default {
  data() {
    return {
      time: 10
    }
  },
  mounted() {
    let vm = this;
    let t = setInterval(() => {
      vm.time--;
      if (vm.time === 0) {
        vm.$emit('end');
        clearInterval(t);
      }
    }, 1000);
  },
  props: {
    col: {
      type: String,
      default: '#000'
    }
  }
};
</script>
