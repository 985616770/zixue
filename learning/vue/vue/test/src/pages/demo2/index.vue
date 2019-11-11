
<template>

  <div>
    <div>选项数据</div>
    <div>--------------------------</div>
    <div>{{ msg }}</div>
    <div>--------------------------</div>
    <div>computed: {{ aDouble }}</div>
    <div>--------------------------</div>
    <div @click="say('hi')">click me</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello world',
      a: 1
    };
  },
  computed: {
    aDouble() {
      return this.a * 2;
    }
  },
  methods: {
    say(el) {
      console.log(el);
    }
  }
};
</script>
