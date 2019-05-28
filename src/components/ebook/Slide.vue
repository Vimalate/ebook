<template>
  <div>
    <transition name="fade">
      <div class="slide-wrapper" v-show="menuShow&&settingShow===3">
        <transition name="slide-right">
        <div class="content" v-if="settingShow===3">
          <div class="content-wrapper" v-if="bookAvailable">
            <div class="page">
              <!-- 按需加载组件 -->
              <component :is="currentTab===1?content:bookmark"></component>
            </div>
            <div class="content-page-tab">
              <div class="content-tab-item" :class="{'selected':currentTab===1}"
              @click="selectTab(1)"
              >{{$t('book.navigation')}}</div>
              <div class="content-tab-item" :class="{'selected':currentTab===2}"
              @click="selectTab(2)"
              >{{$t('book.bookmark')}}</div>
            </div>
          </div>
          <div class="content-empty" v-else>
            <loading></loading>
          </div>
        </div>
        </transition>
        <div class="content-bg" @click="hideTitleAndMenu"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin.js";
import SlideContents from './SlideContents'
import SlideBookmark from './SlideBookmark'
import Loading from './Loading'
export default {
  data() {
    return {
      currentTab:1,
      content:SlideContents,
      bookmark:SlideBookmark
    };
  },
 components:{
   Loading
 },
  methods: {
    selectTab(tab) {
      this.currentTab=tab
    }
  },
  mixins: [ebookMixin]
};
</script>
<style lang='scss' scoped>
@import "../../assets/styles/global";
.slide-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 400;
  display: flex;
  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;
    .content-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      .page {
        flex: 1;
        width: 100%;
        overflow: hidden;
      }
      .content-page-tab {
        display: flex;
        flex: 0 0 px2rem(48);
        width: 100%;
        height: px2rem(48);
        .content-tab-item{
          flex: 1;
          @include center;
          font-size: px2rem(14)

        }
      }
    }
  }
  .content-bg {
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
    background:rgba(0, 0, 0, 0.6);
  }
  .selected{
    color: #4c5059!important;
    font-weight: bold!important;
  }
}
</style>
