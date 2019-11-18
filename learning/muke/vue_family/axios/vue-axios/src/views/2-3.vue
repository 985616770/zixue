<template>
  <div class="home"></div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'home',

  created() {
    axios
      .all([
        axios({
          method: 'get',
          url: '/data.json',
          params: {},
        }),
        axios({
          method: 'get',
          url: '/city.json',
          params: {},
        }),
      ])
      .then(
        axios.spread((data1, data2) => {
          console.log(data1, data2);
        }),
      );
  },
};
</script>
