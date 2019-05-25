<template>
  <div>
    <transition name="popup-slide-up">
      <div class="ebook-popup-list" v-show="fontFamilyVisible">
        <div class="ebook-title">
          <div class="title-icon" @click="hide">
            <span class="icon-down2"></span>
          </div>
          <span class="title-text">{{$t('book.selectFont')}}</span>
        </div>
        <div class="ebook-list-wrapper">
          <div class="ebook-item" v-for="(item, index) in fontFamilyList" :key="index" @click="setFontFamily(item.font)">
            <div class="ebook-item-text" :class="{selected:isSelected(item)}">{{ item.font }}</div>
            <div class="ebook-item-icon" v-if="isSelected(item)">
              <span class="icon-check"></span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin.js";
import { FONT_FAMILY } from "../../utils/book";
import {saveFontFamily} from '../../utils/localStorage'
export default {
  data() {
    return {
        fontFamilyList:FONT_FAMILY
    };
  },
  mixins: [ebookMixin],
  methods: {
    setFontFamily(font) {
        this.setDefaultFontFamily(font)
        saveFontFamily(this.fileName,font) 
        if(font==='Default'){
            this.currentBook.rendition.themes.font('Times New Roman')
        }else{
            this.currentBook.rendition.themes.font(font)
           
        }
    },
    isSelected(item) {
        return this.defaultFontFamily===item.font
    },
    hide() {
      this.setFontFamilyVisible(false);
    }
  }, 
  mounted() {

  },
};
</script>
<style lang='scss' scoped>
@import "../../assets/styles/global";
.ebook-popup-list {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, 0.1);
  .ebook-title {
    position: relative;
    padding: px2rem(15);
    border-bottom: px2rem(1) solid #b8b9bb;
    box-sizing: border-box;
    text-align: center;
    @include center;
    .title-icon {
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      @include center;
      font-size: px2rem(16);
      font-weight: bold;
    }
    .title-text {
      font-size: px2rem(14);
      font-weight: bold;
    }
  }
  .ebook-list-wrapper {
    .ebook-item {
      display: flex;
      padding: px2rem(15);
      .ebook-item-text {
        flex: 1;
        font-size: px2rem(14);
        text-align: left;
        &.selected {
          color: #146cb9;
          font-weight: bold;
        }
      }
      .ebook-item-icon {
        flex: 1;
        text-align: right;
        font-size: px2rem(14);
        font-weight: bold;
        color: #146cb9;
      }
    }
  }
}
</style>