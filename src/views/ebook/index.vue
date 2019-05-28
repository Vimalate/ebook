<template>
  <div class="ebook" ref="ebook">
      <ebook-reader></ebook-reader>
      <ebook-title></ebook-title>
      <ebook-menu></ebook-menu>
      <ebook-mark></ebook-mark>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/Reader'
import EbookTitle from '../../components/ebook/Title'
import EbookMenu from '../../components/ebook/Menu'
import EbookMark from '../../components/ebook/EbookMark'
import { getReadTime, saveReadTime } from '../../utils/localStorage';
import { ebookMixin } from "../../utils/mixin.js";
export default {
  data () {
    return {
    };
  },
  mixins: [ebookMixin],
  components:{
    EbookReader,
    EbookTitle,
    EbookMenu,
    EbookMark
  },
  watch: {
    offsetY(newValue){
      //菜单栏显示和分页未完成时不能下拉添加书签
      if(!this.menuShow&&this.bookAvailable){
        if(newValue>0){
        this.move(newValue)
      }else if(newValue===0){
        this.restore()
      }
      }
      
    }
  },
  methods: {
    restore(){
      this.$refs.ebook.style.top=0+'px'
      this.$refs.ebook.style.transition='all .2s linear'
      //清除动画，防止每次下拉触发动画
      setTimeout(()=>{
        this.$refs.ebook.style.transition=''
      },200)
    },
    move(newValue){
      this.$refs.ebook.style.top=newValue+'px'
      // console.log(this.$refs.ebook.style.top)
    },
    startReadTime() {
      let readTime=getReadTime(this.fileName)
      if(!readTime){
        readTime=0
      }
      this.timer=setInterval(()=>{
        readTime++
        if(readTime%30){
          saveReadTime(this.fileName,readTime)
        }
      },1000)
    }
  },
  mounted() {
    this.startReadTime()
  },
  beforeDestroy() {
    if(this.timer){
      clearInterval(this.timer)
    }
  },

}

</script>
<style lang='scss' scoped>
@import "../../assets/styles/global";
  .ebook {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
</style>