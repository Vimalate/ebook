<template>
  <div class="search-container">
    <div class="slide-contents-search-wrapper">
      <div class="search-input-wrapper">
        <div class="search-icon" @click="search">
          <span class="icon-search"></span>
        </div>
        <input
          type="text"
          class="search-input"
          :placeholder="$t('book.searchHint')"
          @click="hideSearchVisible"
          v-model.trim="searchText"
          @keyup.enter.exact="search"
        >
      </div>
      <div
        class="search-cancel"
        v-if="searchVisible"
        @click="hideSearchVisible"
      >{{$t('book.cancel')}}</div>
    </div>
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="book-img-wrapper">
        <img :src="cover" class="book-img" alt>
      </div>
      <div class="book-info-title">
        <div class="book-title"><span class="book-title-text">{{metadata.title}}</span></div>
        <div class="book-author"><span class="book-author-text">{{metadata.creator}}</span></div>
      </div>
      <div class="book-progress-wrapper">
        <div class="book-progress">
          <span class="progress">{{progress+'%'}}</span>
          <span class="progress-text">&nbsp;{{$t('book.haveRead2')}}</span>
        </div>
        <div class="book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
    <scroll class="slide-contents-list" v-show="!searchVisible" :top="156" :bottom="48" ref="scroll">
      <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index"
      @click="displayNavigation(item.href)">
        <span class="slide-contents-item-label"
        :class="{'selected':section===index}"
        :style="contentItem(item)"
        >{{item.label}}</span>
        <span class="slide-contents-page">{{item.page}}</span>
      </div>
    </scroll>
    <scroll class="slide-search-list" 
    :top='66' :bottom='48'  v-show="searchVisible" >
      <div class="slide-search-item" v-for="(item, index) of searchList"
       :key="index" v-html="item.excerpt" @click="displayNavigation(item.cfi,true)">
        
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
      searchVisible: false,
      searchText:'',
      searchList:null
    };
  },
  methods: {
    //整本书搜索
    doSearch(q) {
        return Promise.all(
          this.currentBook.spine.spineItems.map(
            item => item.load(this.currentBook.load.bind(this.currentBook)).then(item.find.bind(item, q)).finally(item.unload.bind(item)))
        ).then(results => 
         //二维数组和空数组连接进行降纬操作
        Promise.resolve([].concat.apply([], results)))
      }, 
    search() {
      let searchText=this.searchText
      if(searchText&&searchText.length>0){
        this.doSearch(searchText).then((result)=>{
        this.searchList=result
        this.searchText=''
        this.searchList.map(item=>{
        item.excerpt=item.excerpt.replace(searchText,` <span class="content-search-text">
        ${searchText}</span>`)
        return item
        })
      })
      }
    },
    search1() { 
        this.doSearch(this.searchText).then(result => {
          this.searchList = result.map(item => {
            item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`)
            return item
          })
          this.$refs.searchInput.blur()
        })
      },
    displayNavigation(target,highlight=false) {//heighlight默认false
      this.display(target,()=>{
        this.hideTitleAndMenu()
        if(highlight){
          this.currentBook.rendition.annotations.highlight(target)
        }
      })
    },
    hideSearchVisible() {
      this.searchVisible = !this.searchVisible
      this.searchText=''
      this.searchList=null
    },
    contentItem(item) {
      return {
         marginLeft:`${px2rem(item.level*15)}rem`
      }
    },
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
      // width: px2rem(150);
      .book-title {
        font-size: px2rem(14);
        line-height: px2rem(16);
        @include left;
        .book-title-text{
         @include ellipsis2(2);
      }
      }
      .book-author {
        font-size: px2rem(12);
        margin-top: px2rem(6);
        line-height: px2rem(14);
         @include left;
        .book-author-text{
           @include ellipsis
        }
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
        color: #4c5059;
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
      .slide-contents-page{
        flex: 0 0 px2rem(30);
        font-size: px2rem(10);
        @include right;
      }
    }
  }
  .slide-search-list{
    width: 100%;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-search-item{
      font-size: px2rem(14);
      line-height: px2rem(16);
      padding: px2rem(20) 0;
      box-sizing: border-box;

    }
  }
}
</style>
