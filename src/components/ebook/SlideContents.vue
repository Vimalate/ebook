<template>
  <div class="search-container">
    <div class="slide-contents-search-wrapper">
      <div class="search-input-wrapper">
        <div class="search-icon">
          <span class="icon-search"></span>
        </div>
        <input
          type="text"
          class="search-input"
          :placeholder="$t('book.searchHint')"
          @click="hideSearchVisible"
        >
      </div>
      <div
        class="search-cancel"
        v-if="searchVisible"
        @click="hideSearchVisible"
      >{{$t('book.cancel')}}</div>
    </div>
    <div class="slide-contents-book-wrapper">
      <div class="book-img-wrapper">
        <img :src="cover" class="book-img" alt>
      </div>
      <div class="book-info-title">
        <div class="book-title">{{metadata.title}}</div>
        <div class="book-author">{{metadata.creator}}</div>
      </div>
      <div class="book-progress-wrapper">
        <div class="book-progress">
          <span class="progress">{{progress+'%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
    <scroll class="slide-contents-list" :top="156" :bottom="48" ref="scroll">
      <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index"
      @click="displayNavigation(item.href)">
        <span class="slide-contents-item-label"
        :class="{'selected':section===index}"
        :style="contentItem(item)"
        >{{item.label}}</span>
        <span class="slide-contents-page"></span>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../Scroll";
import { ebookMixin } from "../../utils/mixin.js";
import {px2rem} from '../../utils/utils'
export default {
  data() {
    return {
      searchVisible: false
    };
  },
  methods: {
    displayNavigation(item) {
      this.display(item,()=>{
        this.hideTitleAndMenu()
      })
    },
    hideSearchVisible() {
      return (this.searchVisible = !this.searchVisible);
    },
    contentItem(item) {
      return {
         marginLeft:`${px2rem(item.level*15)}rem`
      }
    }
  },
  mixins: [ebookMixin],
  components: {
    Scroll
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global";

.search-container {
  font-size: 0; //解决dom间换行空格带来的多余空隙
  width: 100%;
  .search-input-wrapper {
    border: px2rem(1) solid #ddd;
    border-radius: px2rem(5);
    // @include center;
    // box-sizing: border-box;
  }
  .slide-contents-book-wrapper {
    display: flex;
    height: px2rem(90);
    width: 100%;
    padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
    box-sizing: border-box;
    .book-img-wrapper {
      flex: 0 0 px2rem(45);
      .book-img {
        width: px2rem(45);
        height: px2rem(60);
      }
    }
    .book-info-title {
      padding: 0 px2rem(10);
      box-sizing: border-box;
      flex: 1;
      width: px2rem(150);
      .book-title {
        font-size: px2rem(14);
        line-height: px2rem(16);
        @include ellipsis2(2);
      }
      .book-author {
        font-size: px2rem(12);
        margin-top: px2rem(6);
      }
    }
    .book-progress-wrapper {
      flex: 0 0 px2rem(70);
      .book-progress {
        margin-top: px2rem(3);
        .progress {
          font-size: px2rem(14);
        }
        .progress-text {
          font-size: px2rem(12);
        }
      }
      .book-time {
        font-size: px2rem(12);
        margin-top: px2rem(10);
      }
    }
  }
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .search-input-wrapper {
      flex: 1;
      @include center;
      .search-icon {
        flex: 0 0 px2rem(28);
        font-size: px2rem(14);
        @include center;
      }
      .search-input {
        flex: 1;
        width: 100%;
        font-size: px2rem(12);
        height: px2rem(28);
        // padding: 0 px2rem();
        background: transparent;

        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    .search-cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;
    }
  }
  .slide-contents-list{
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-item{
      padding:px2rem(16) 0;
      display: flex;
      box-sizing: border-box;
      .slide-contents-item-label{
        flex: 1;
        font-size: px2rem(14);
        line-height: px2rem(16);
        @include ellipsis;
       
      }
      .slide-contents-page{}
    }
  }
}
</style>
