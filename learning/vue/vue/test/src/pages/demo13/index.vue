<template>
  <div>
    <div>slot</div>
    <slot-test>
<h3>sdaflasdf</h3>
<h2 slot="bottom"> dsjafksdf</h2>
    </slot-test>
  </div>
</template>

<script>
import slot from '@/components/slot.vue';
export default {
  data() {
    return {};
  },
  components: {
    'slot-test':slot
  }
};
</script>
