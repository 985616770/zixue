<template>
  <div
    ><div> 事件处理器</div>
    <div>-----------------------</div>

    <div id="example-1">
      <button @click="counter += 1">加一</button>
      <p>这个按钮点击了{{ counter }}次</p>
    </div>
    <div>
      <button @click="greet">Greet</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    greet() {
      this.counter += 1;
    }
  }
};
</script>
