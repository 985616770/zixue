<template>
  <div class="mine-loading" :class="{ 'mine-loading-inline': inline }">
    <span class="mine-loading-indicator" v-if="indicator === 'on'">
      <slot>
        <img src="./loading.gif" alt="loding.gif" />
      </slot>
    </span>
    <span class="mine-loading-text" v-if="loadingText">{{ loadingText }}</span>
  </div>
</template>

<script>
export default {
  name: 'MeLoading',
  props: {
    indicator: {
      type: String,
      default: 'on',
      validator(val) {
        return ['on', 'off'].includes(val);
      },

    },
    text: {
      type: String,
      default: '正在加载中...',
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    text(text) {
      loadingText = this.text;
    },
  },
  methods: {
    setText(text) {
      this.loadingText = text;
    },
  },
  data() {
    return {
      loadingText: this.text,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/mixins';

.mine-loading {
  overflow: hidden;
  width: 100%;
  height: 100%;
  @include flex-center(column);

  &.mine-loading-inline {
    flex-direction: row;

    .mine-loading-indicator ~ .mine-loading-text {
      margin-top: 0;
      margin-left: 6px;
    }
  }
}

.mine-loading-indicator ~ .mine-loading-text {
  margin-top: 6px;
}
</style>
