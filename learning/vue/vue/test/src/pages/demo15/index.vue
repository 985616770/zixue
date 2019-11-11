<template>
  <div>
    <div>mint UI</div>
    <mt-range
      v-model="rangeValue"
      :min="10"
      :max="90"
      :step="10"
      :bar-height="5"
    >
    </mt-range>

   <input type="range" v-model="rangeValue" value="">
  </div>
</template>

<script>
import Vue from 'vue';
import { Range } from 'mint-ui';

Vue.component(Range.name, Range);
export default {
  data() {
    return {
      rangeValue: 33,
      active: true
    };
  },
  mounted() {
    Toast('提示信息');
  }
};
</script>
