<template>
  <div>
    <transition name="slide-up">
      <div
        class="menu-wrapper"
        :class="{'hide-box-shadow':!menuShow||settingShow>=0}"
        v-show="menuShow"
      >
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright icon" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A icon" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-popup></ebook-popup>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    <ebook-slide></ebook-slide>
  </div>
</template>
 
<script>
import { ebookMixin } from "../../utils/mixin.js";
import EbookSettingFont from "./SettingFont";
import EbookPopup from "./settingFontPopup";
import EbookSettingTheme from "./SettingThem";
import EbookSettingProgress from "./SettingProgress";
import EbookSlide from "./Slide";
export default {
  data() {
    return {};
  },
  components: {
    EbookSettingFont,
    EbookPopup,
    EbookSettingTheme,
    EbookSettingProgress,
    EbookSlide
  },
  mixins: [ebookMixin],
  methods: {
    showSetting(key) {
      this.setsettingShow(key);
    },
    ifSettingShow() {},
    ifTitleAndMenuShow() {}
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/styles/global";
.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background: white;
  font-size: px2rem(20);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  &.hide-box-shadow {
    box-shadow: none;
  }
  .icon-wrapper {
    flex: 1;
    @include center;
    .icon-progress {
      font-size: px2rem(24);
    }
    .icon-bright {
      font-size: px2rem(22);
    }
  }
}
</style>