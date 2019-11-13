<template>
  <ul class="c-course">
    <router-link to="/detail">
      <li class="c-item" v-for="item in arrList">
        <img :src="item.imgUrl" alt="" />
        <div>
          <h1>{{ item.title }}</h1>
          <p>
            {{ item.msg }}
          </p>
        </div>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: {
    arrList: Array,
  },
};
</script>

<style scoped>
.c-course {
  padding: 10px 0 0 0;
  background-color: #fff;
}

.c-item {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  margin-left: 20px;
  font-family: PingFangSC-Regular;
}
.c-item > img {
  width: 108px;
  height: 72px;
  border-radius: 3px;
}
.c-item > div {
  margin-left: 16px;
}
.c-item > div p {
  font-size: 12px;
  color: #71777d;
  line-height: 14px;
  margin-top: 8px;
}
.c-item > div h1 {
  font-size: 15px;
  color: #2b333b;
  letter-spacing: 0;
  line-height: 17px;
}

</style>
