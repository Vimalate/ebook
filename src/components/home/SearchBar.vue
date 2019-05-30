<template>
<div>
  <div class="search-bar" :class="{'hide-title':!titleVisible ,'hide-shadow':!shadowVisible}">
    <transition name="title-move">
      <div class="search-bar-title-wrapper" v-show="titleVisible">
        <div class="search-text-wrapper">
          <span class="title-text title">{{$t('home.title')}}</span>
        </div>
        <div class="search-icon-shake-wrapper">
          <span class="icon-shake icon" @click="showFlapCard"></span>
        </div>
      </div>
    </transition>
    <div class="search-icon-back-wrapper" @click="back" :class="{'hide-title':!titleVisible}">
      <span class="icon-back icon"></span>
    </div>
    <div class="search-bar-input-wrapper" :class="{'hide-title':!titleVisible}">
      <div class="search-blank" :class="{'hide-title':!titleVisible}"></div>
      <div class="search-bar-input">
        <span class="icon-search icon"></span>
        <input type="text" class="input" 
        :placeholder="$t('home.hint')" 
        v-model="searchText" @click="showHotSearch">
      </div>
    </div>
  </div>
  <hot-search-list v-show="hotSearchVisible" ref="hotSearchList"></hot-search-list>
</div>
</template>

<script>
import { storeHomeMixin } from "../../utils/mixin";
import HotSearchList from './HotSearchList'
export default {
  mixins: [storeHomeMixin],
  data() {
    return {
      searchText: "",
      titleVisible: true,
      shadowVisible:false,
      hotSearchVisible:false
    };
  },
  components:{
    HotSearchList
  },
  watch: {
    //监听滚动的距离
    offsetY(offsetY) {
      if (offsetY > 0) {
        this.hideTitle();
        this.showShadow()
      } else {
        this.showTitle();
        this.hideShadow()
      }
    },
     hotSearchOffsetY(offsetY) {
      if (offsetY > 0) {
        this.showShadow()
      } else {
        this.hideShadow()
      }
    }
  },
  methods: {
    // showHotSearch() {
    //   this.hotSearchVisible=!this.hotSearchVisible
    // },
    showFlapCard() {
        this.setFlapCardVisible(true)
      },
    back() {
      if(this.offsetY>0){
        this.showShadow()
      }else{
        this.hideShadow()
      }
      this.hideHotSearch()
     
    },
    hideHotSearch() {
      this.hotSearchVisible=false
      if(this.offsetY>0){
        //隐藏标题的时候，显示阴影
        this.hideTitle()
        this.showShadow()
      }else{
        this.showTitle()
        this.hideShadow()
      }
    },
    showHotSearch() {
      this.hideTitle()
      this.hotSearchVisible=true
      this.hideShadow()
      //dom 显示后才生效
      this.$nextTick(()=>{
        this.$refs.hotSearchList.reset()
      })
      
    },
    hideTitle() {
      this.titleVisible = false;
    },
    showTitle() {
      this.titleVisible = true;
    },
    hideShadow() {
      this.shadowVisible = false;
    },
    showShadow() {
      this.shadowVisible = true;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.search-bar {
  z-index: 150;
  position: relative;
  height: px2rem(94);
  width: 100%;
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
  &.hide-shadow{
    box-shadow: none;
  }
  //加一个隐藏动态样式
  &.hide-title {
    height: px2rem(52);
  }
  .search-bar-title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(42);
    
    .search-text-wrapper {
      width: 100%;
      height: px2rem(42);
      @include center;
    }
    .search-icon-shake-wrapper {
      position: absolute;
      right: px2rem(15);
      top: 0;
      height: px2rem(42);
      @include center;
    }
  }
  .search-icon-back-wrapper {
    z-index: 200;
    position: absolute;
    left: px2rem(15);
    top: 0;
    height: px2rem(42);
    @include center;
    transition: height .2s linear;
    &.hide-title{
      height: px2rem(52);
    }
  }
  .search-bar-input-wrapper {
    position: absolute;
    display: flex;
    left: 0;
    top: px2rem(42);
    width: 100%;
    height: px2rem(52);
    padding: px2rem(10);
    box-sizing: border-box;
    transition: top .2s linear;
    &.hide-title{
      top: 0;
    }
    .search-blank{
      flex: 0 0 0 ;
      width: 0;
      transition: all .2s linear;
      &.hide-title{
      flex: 0 0 px2rem(31);
      width: px2rem(31);
    }
      
    }
    .search-bar-input {
      flex: 1;
      width: 100%;
      background-color: #f4f4f4;
      border-radius: px2rem(20);
      @include left;
      box-sizing: border-box;
      padding: px2rem(6) px2rem(15);
      border: px2rem(1) solid #eee;
      .icon-search {
        color: #999;
      }
      .input {
        width: 100%;
        height: px2rem(22);
        border: none;
        background-color: transparent;
        margin-left: px2rem(15);
        font-size: px2rem(12);
        color: #666;
        &:focus {
          outline: none;
        }
        &::-webkit-input-placeholder {
          color: #ccc;
        }
      }
    }
  }
}
</style>