<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFixed?fixedStyle:{}">
      <ebook-mark :color="color" :width="16" :height="36"></ebook-mark>
    </div>
  </div>
</template>

<script>
import EbookMark from "../common/EbookMark";
import { realPx,px2rem } from "../../utils/utils";
import { ebookMixin } from "../../utils/mixin.js";
import { getBookmark, saveBookmark } from '../../utils/localStorage';
const BLUE = "#346cbc";
const WHITE = "#fff";
export default {
  data() {
    return {
      text: '',
      color: WHITE,
      isFixed:false//是否可以添加书签
    };
  },
  computed: {
    height() {
      return realPx(36);
    },
    //下拉书签临界值
    threshold() {
      return realPx(60);
    },
    fixedStyle() {
        return {
            position:'fixed',
            right:`${px2rem(16)}rem`,
            top:0
        }
    }
  },
  watch: {
    offsetY(v) {
        //减少不必要的监听
        if(!this.bookAvailable||this.settingShow>=0||this.menuShow){
            return
        }
      if (v >= this.height && v < this.threshold) {
        //状态2：未到达临界状态
        //吸顶效果，两者一起运动，相对静止
        this.beforeThreshold(v);
      } else if (v >= this.threshold) {
        //状态3：超越临界状态
        this.afterThreshold(v)
      }else if(v>0&&v<this.height){
          //状态1
        this.beforeHeight()
      }else if(v===0){
          //状态4：归位
          this.restore()
      }
    },
     isBookmark(isBookmark) {
        this.isFixed = isBookmark
        if (isBookmark) {
          this.color = BLUE
        } else {
          this.color = WHITE
        }
      }
  },
  methods: {
    addBookmark() {
        this.bookmark=getBookmark(this.fileName)
        if(!this.bookmark){
            this.bookmark=[]
        }
        const currentLocation=this.currentBook.rendition.currentLocation()
        const cfiBase=currentLocation.start.cfi.replace(/!.*/,'')
        const cfiStart=currentLocation.start.cfi.replace(/.*!/,'').replace(/\)$/,'')
        const cfiEnd=currentLocation.end.cfi.replace(/.*!/,'').replace(/\)$/,'')
        const cfiRange=`${cfiBase}!,${cfiStart},${cfiEnd})`
        this.currentBook.getRange(cfiRange).then((range)=>{
            const text=range.toString().replace(/\s\s/g,'')
            this.bookmark.push({
                cfi:currentLocation.start.cfi,
                text
            })
            saveBookmark(this.fileName,this.bookmark)
        })
    },
    removeBookmark() {
        const currentLocation=this.currentBook.rendition.currentLocation()
        const cfi=currentLocation.start.cfi
        this.bookmark=getBookmark(this.fileName)
        if(this.bookmark){
            //书签数组中还未添加的加入
            this.bookmark=this.bookmark.filter(item=>item.cfi!=cfi)
            saveBookmark(this.fileName,this.bookmark)
        }
        this.setIsBookmark(false)
    },
    restore() {
        setTimeout(()=>{
              this.$refs.bookmark.style.top=`${px2rem(-this.height)}rem`
              this.$refs.iconDown.style.transform=''
          },200)
          if(this.isFixed){
              this.setIsBookmark(true)
              this.addBookmark()
          }else{
              this.setIsBookmark(false)
              this.removeBookmark()
          }
    },
    beforeHeight() {
        // 状态1：未超过书签的高度
        if (this.isBookmark) {
          this.text = this.$t('book.pulldownDeleteMark')
          this.color = BLUE
          this.isFixed = true
        } else {
          this.text = this.$t('book.pulldownAddMark')
          this.color = WHITE
          this.isFixed = false
        }
      },
    beforeThreshold(v) {
      this.$refs.bookmark.style.top = `${-v}px`;
        this.beforeHeight()
          let iconDown = this.$refs.iconDown;
      if (iconDown.style.transform === "rotate(180deg)") {
        iconDown.style.transform = "";
      }
      this.isFixed=false
    },
    afterThreshold(v) {
      this.$refs.bookmark.style.top = `${-v}px`;
      if(this.isBookmark){
          //已经是书签的下拉删除
          this.text = this.$t("book.releaseDeleteMark");
          this.color = WHITE;
          this.isFixed=false
      }else{
          //不是的添加
          this.text = this.$t("book.releaseAddMark");
          this.color = BLUE;
          this.isFixed=true
      }
      let iconDown = this.$refs.iconDown;
      if (iconDown.style.transform === "") {
        iconDown.style.transform = "rotate(180deg)";
      }
      ///dug所在，全部置为true了，一旦超过临街值，fixed一直存在
    //   this.isFixed=true
    }
  },
  mixins: [ebookMixin],
  components: {
    EbookMark
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global";
.ebook-bookmark {
  position: absolute;
  left: 0;
  top: px2rem(-35);
  z-index: 200;
  width: 100%;
  height: px2rem(35);
  .ebook-bookmark-text-wrapper {
    position: absolute;
    display: flex;
    right: px2rem(45);
    bottom: 0;
    .ebook-bookmark-down-wrapper {
      font-size: px2rem(14);
      transition: all 0.2s linear;
      color: #fff;
      @include center;
    }
    .ebook-bookmark-text {
      font-size: px2rem(14);
      color: #fff;
    }
  }
  .ebook-bookmark-icon-wrapper {
    position: absolute;
    bottom: 0;
    right: px2rem(15);
  }
}
</style>
