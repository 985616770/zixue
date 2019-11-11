<template>
  <div>
    <div>自定义组件</div>
    <countdown col='red' @end=
    ending> </countdown>
  </div>
</template>

<script>
import countdown from '@/components/countdown.vue';
export default {
  data() {
    return {};
  },
  components: {
    countdown
  },
  methods: {
    ending(){
      console.log('over');
    }
  },
};
</script>
