<template>
  <div class="home">

  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'home',

  created() {
    axios.get('/data.json').then(res => console.log(res));
  },
};
</script>
