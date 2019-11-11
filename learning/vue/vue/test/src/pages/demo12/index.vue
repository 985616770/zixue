<template>
  <div>
    <div>vuex</div>

    <div>{{ msg }}</div>
    <button @click="change">change</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 123
    };
  },
  methods: {
    change() {
      // get data
      // this.msg = this.$store.state.count;
      // set data
      this.$store.dispatch('inc', 100000);
      this.msg = this.$store.state.num;
    }
  }
};
</script>
