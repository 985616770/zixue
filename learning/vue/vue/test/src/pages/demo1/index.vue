<template>
  <div>
    hello world
  </div>
</template>

<script>
export default {
  data() {
    return {};w
  },
  beforeCreate() {
    console.log('before');
  },
  created() {
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
  }
};
</script>
