<template>
  <div class="home"></div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'home',

  created() {
    const instance = axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 1000,
    });
    // const instance2 = this.$http.create({
    //   baseURL: 'http://localhost:8081',

    //   timeout: 1000,
    // });
    instance.get('/data.json').then((res) => {
      console.log(res);
    });
    // instance2.get('/data.json').then((res) => {
    //   console.log(res);
    // });
  },
};
</script>
