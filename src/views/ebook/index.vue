<template>
  <div class="book">
      <ebook-reader></ebook-reader>
      <ebook-title></ebook-title>
      <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/Reader'
import EbookTitle from '../../components/ebook/Title'
import EbookMenu from '../../components/ebook/Menu'
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
    EbookMenu
  },
  methods: {
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
</style>