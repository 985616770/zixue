<template>
  <div class="mine-navbar">
    <div class="mine-navbar-left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="mine-navbar-center" v-if="$slots.center">
      <slot name="center"></slot>
    </div>
    <div class="mine-navbar-right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeNavbar',
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/mixins';

.mine-navbar {
  @include flex-between;
  height: 50px;
  background-color: #fff;
  &-left {
    margin-left: 10px;
  }
  &-center {
    flex: 1;
  }
  &-right {
    margin-right: 10px;
  }
}
</style>
