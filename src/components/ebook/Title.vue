<template>
  <div class="container">
    <transition name="slide-down">
      <div class="title-wrapper" v-show="menuShow">
        <div class="left" @click="back">
          <span class="icon-back"></span>
        </div>
        <div class="right">
          <div class="icon-wrapper">
            <span class="icon-shelf"></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-cart"></span>
          </div>
          <div class="icon-wrapper" @click="gotoBookStore">
            <span class="icon-more"></span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin.js";
export default {
  data() {
    return {};
  },
  mixins: [ebookMixin],
  methods: {
    back() {
      this.$router.go(-1)
    },
    gotoBookStore() {}
  },
  components: {}
};
</script>
 
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  background-color: white;
  height: px2rem(48);
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
  font-size: px2rem(22);
  .left {
    flex: 0 0 px2rem(37);
    @include right;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 px2rem(37);
      @include left;
    }
  }
}
</style>
