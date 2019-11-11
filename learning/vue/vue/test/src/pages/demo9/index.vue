<template>
  <div>
    <div>
      <div>VUE dom</div>
      <div>---------------</div>
      <div ref="head"></div>
    </div>
    <div>
      <div>过渡效果</div>
      <button @ click="show = !show">Toggle</button>
      <transition name="fade">
        <p v-if="show">Hello</p>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },
  mounted() {
    this.$refs.head.innerHTML = `123`;
  }
};
</script>

<style>
.fade-enter-active,
.fade-levae-active {
  transition: all 2.5s;
}
.fade-levae-to,
.fade-enter {
  opacity: 0;
}
</style>
