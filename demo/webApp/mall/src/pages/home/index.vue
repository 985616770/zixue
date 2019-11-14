<template>
  <div class="home">
    <header class="g-header-container">
      <home-header
        ref="header"
        :class="{ 'header-transition': isHeaderTransition }"
      >
        <input type="search" name="" id="" placeholder="想买啥" class="home-header-search" />
      </home-header>
    </header>

    <me-scroll
      pullDown
      pullUp
      :data_rec="recommends"
      @pull-down="pullToRefresh"
      @pull-up="pullToLoadMore"
      @scroll-end="scrollEnd"
      @scroll="scroll"
      @pull-down-transition-end="pullDownTransitionEnd"
      ref="scroll"
    >
      <home-slider ref="slider" />
      <home-nav></home-nav>
      <home-recommend @loaded="getRecommends" ref="recommend"></home-recommend>
    </me-scroll>

    <div class="g-backtop-container">
      <me-backtop :visible="isBacktopVisible" @backtop="backToTop" />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import MeScroll from 'base/scroll';
import MeBacktop from 'base/backtop';
import HomeHeader from './header';
import HomeSlider from './slider';
import HomeNav from './nav';
import HomeRecommend from './recommend';
import { HEADER_TRANSITION_HEIGHT } from './config';

export default {
  name: 'Home',
  data() {
    return {
      recommends: [],
      isBacktopVisible: false,
      isHeaderTransition: false,
    };
  },
  components: {
    MeScroll,
    HomeHeader,
    HomeSlider,
    HomeNav,
    HomeRecommend,
    MeBacktop,
  },
  methods: {
    updateScroll() {},
    getRecommends(recommends) {
      this.recommends = recommends;
    },
    pullToRefresh(end) {
      this.$refs.slider.update().then(end);
    },
    pullToLoadMore(end) {
      this.$refs.recommend
        .update()
        .then(end)
        .catch(err => {
          if (err) {
            console.log(err);
          }
          end();
        });
    },
    scrollEnd(translate, scroll, pulling) {
      if (!pulling) {
        this.changeHeaderStatus(translate);
      }
      this.isBacktopVisible = translate < 0 && -translate > scroll.height;
    },
    scroll(translate) {
      this.changeHeaderStatus(translate);
    },
    pullDownTransitionEnd() {
      this.$refs.header.show();
    },
    backToTop() {
      this.$refs.scroll && this.$refs.scroll.scrollToTop();
    },
    changeHeaderStatus(translate) {
      if (translate > 0) {
        this.$refs.header.hide();
        return;
      }

      this.$refs.header.show();

      this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT;
      console.log(this.isHeaderTransition);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/mixins';

.home {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: $bgc-theme;
}
.home-header-search {
  width: 90%;
  height: 35px;
  margin-left: 15px;
  padding-left: 20px;
  background-color: #fff;
  border-radius: 10px;
}
</style>
