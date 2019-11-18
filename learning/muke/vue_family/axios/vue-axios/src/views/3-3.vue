<template>
  <div class="home"></div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'home',

  created() {
    // 例 : 新浪微博需要登入才能访问和 不需要登入即可访问
    const instance = axios.create({});
    instance.interceptors.request.use((config) => {
      config.headers.token = '';
      return config;
    });
    const newInstance = axios.create({});
    // 移动端 加载过程显示弹窗
    const aa = axios.create({});
    aa.interceptors.request.use((config) => {
      // $().show
      return config;
    });
    aa.interceptors.response.use(res=>{
      // $().hide 
      return res
    })
  },
};
</script>
