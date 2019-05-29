<template>
  <div class="container">
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="menuShow&&settingShow===2">
        <div class="setting-progress">
          <div class="read-time-wrapper">
            <span class="text">{{getReadTimeText()}}</span>
            <span class="icon-forward"></span>
          </div>
          <div class="progress-wrapper">
            <div class="progress-icon-wrapper" @click="prevSection()">
              <span class="icon-back"></span>
            </div>
            <input
              class="progress"
              type="range"
              max="100"
              min="0"
              step="1"
              @change="onProgressChange($event.target.value)"
              @input="onProgressInput($event.target.value)"
              :value="progress"
              :disabled="!bookAvailable"
              ref="progress"
            >
            <div class="progress-icon-wrapper" @click="nextSection()">
              <span class="icon-forward"></span>
            </div>
          </div>
          <div class="text-wrapper">
            <span class="text-title">{{getSectionName}}</span>
            <span>&nbsp;&nbsp;({{bookAvailable ? progress + '%' :  $t('book.loading')}})</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin.js";
import { saveProgress } from '../../utils/localStorage';
export default {
  data() {
    return {};
  },
  computed: {
    // getSectionName() {
    //   // if (this.section) {
    //   //   let currentSectionInfo = this.currentBook.section(this.section);
    //   //   if (currentSectionInfo && currentSectionInfo.href&&this.currentBook.navigation) {
    //   //     return this.currentBook.navigation.get(currentSectionInfo.href).label;
    //   //   }
    //   // }//不能获取二级目录

    //   return this.section?this.navigation[this.section].label:''
    // }
  },
  methods: {
    onProgressChange(progress) {
      this.setProgress(progress).then(() => {
        this.displayProgress();
        this.updateProgress();
      });
      saveProgress(this.fileName, progress)
    },

    onProgressInput(progress) {
      this.setProgress(progress).then(() => {
        this.displayProgress();
        this.updateProgress();
      });
    },
    updateProgress() {
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`;
    },
    prevSection() {
      if (this.section && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
          this.displaySection();
        });
      }
      
    },
    nextSection() {
      //小于总章节并且分页渲染完成
      if (this.section < this.currentBook.spine.length && this.bookAvailable) {
        this.setSection(this.section + 1).then(() => {
          this.displaySection();
        });
      }
    },
    displaySection() {
      let sectionInfo = this.currentBook.section(this.section);
      if (sectionInfo && sectionInfo.href) {
        this.display(sectionInfo.href)
      }
    },
    
  },
  updated() {
    this.updateProgress();
  },
  mixins: [ebookMixin],
  components: {}
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global";
.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 160;
  width: 100%;
  height: px2rem(90);
  background: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;
    .read-time-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      @include center;
      height: px2rem(40);
      font-size: px2rem(12);
    }
    .progress-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      padding: 0 px2rem(20);
      box-sizing: border-box;
      .progress-icon-wrapper {
        font-size: px2rem(20);
      }
      .progress {
        width: 100%;
        -webkit-appearance: none;
        height: px2rem(2);
        margin: 0 px2rem(10);
        background: -webkit-linear-gradient(#5d6268, #5d6268) no-repeat, #b4b5b7!important;
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: white;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
          border: px2rem(1) solid #ddd;
        }
      }
    }
    .text-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(10);
      width: 100%;
      color: #333;
      font-size: px2rem(12);
      box-sizing: border-box;
      padding: 0 px2rem(15);
      @include center;
      .text-title {
       @include ellipsis
      }
    }
  }
}
</style>
