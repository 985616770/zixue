<template>
  <div class="c-header">
    <ul class="header-ul">
      <li>推荐</li>
      <li>课程</li>
      <li>实战</li>
      <li>职业路线</li>
      <li class="header-search"><img src="../../assets/search.png" /></li>
      <li class="header-history"><img src="../../assets/history.png" /></li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.c-header {
  position: fixed;
  width: 375px;
  z-index: 3;
  top: 0;
  left: 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.header-ul {
  font-size: 0;
}
.header-ul li {
  display: inline-block;

  padding-left: 20px;
  font-size: 16px;
  color: #71777d;
  height: 44px;
  line-height: 44px;
}
.header-ul img {
  display: inline-block;
  width: 18px;
  vertical-align: -4px;
}
.header-ul .header-search {
  padding-left: 60px;
}
</style>
