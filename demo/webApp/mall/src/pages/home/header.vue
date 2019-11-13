<template>
  <div>
    <me-navbar class="header">
     <i class="iconfont icon-scan" slot="left"></i>
     <i class="iconfont icon-scan" slot="center"></i>
     <i class="iconfont icon-scan" slot="right"></i>
    </me-navbar>
  </div>
</template>

<script>
import MeNavbar from 'base/navbar';
export default {
  name: 'Header',
  components: {
    MeNavbar,
  },
};
</script>

<style lang="scss" scoped></style>
