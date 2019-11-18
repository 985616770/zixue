<template>
  <div class="home"></div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'axios2-2',

  created() {
    axios
      .get('/data.json', {
        params: {
          id: 1,
          name: 3,
        },
      })
      .then(res => console.log(res));
    axios({
      method: 'get',
      url: '/data.json',
      params: {
        id: 999,
        name: 'hello',
      },
    }).then((data) => {
      console.log(data);
    });
    const data = {
      id: 2,
    };
    axios.post('/post', data).then(res => console.log(res));
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    axios.post('/post', formData).then(res => console.log(res));

    axios.put('/put', data).then(res => console.log(res));
    axios.patch('/put', data).then(res => console.log(res));
  },
};
</script>
