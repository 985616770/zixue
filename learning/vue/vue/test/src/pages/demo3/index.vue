<template>
  <div>
    <div>模板语法</div>
    <div>------------------------</div>
    <div> data: {{ msg }} </div>
    <div>------------------------</div>
    <div>{{ num ** 2 }}</div>
    <div>------------------------</div>
    <div v-html="raw"></div>
    <div>------------------------</div>
    <div :class="red"></div>
    <div @click="change">change</div>
    <div>------------------------</div>
    <div @click="say('hi')">kasdflasdkf</div>
    <div>------------------------</div>
    <div>{{ mess | filter }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '123',
      num: '3',
      raw: '<span>123</span>',
      red: 'red active',
      mess: 'abc'
    };
  },
  methods: {
    change() {
      this.red = 'blue';
    },
    say(args) {
      console.log(args);
    }
  },
  filters: {
    filter(e) {
      return e.toUpperCase();
    }
  }
};
</script>
