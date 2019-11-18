<template>
  <div class="home"></div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'home',

  created() {
    // 全局
    axios.defaults = {
      baseURL: 'http://localhost:8080',
    };
    // 实例
    const instance = axios.create({
      baseURL: 'http://localhost:8080',
    });
    instance.defaults.baseURL = 'http://localhost:8080';
    // 请求
    instance.get('/data.json', {
      baseURL: 'http://localhost:8080',
    });
  },
};
</script>
