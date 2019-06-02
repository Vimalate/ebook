<template>
  <div class="store-shelf">
    <shelf-title></shelf-title>
    <scroll class="store-shelf-scroll-wrapper" :top='0' 
    :bottom='scrollBottom' @onScroll='onScroll' ref="scroll" >
      <shelf-search></shelf-search>
      <shelf-list></shelf-list>
    </scroll>
    <shelf-footer></shelf-footer>
  </div>
</template>

<script>
import {storeShelfMixin} from '../../utils/mixin'
// import { storeHomeMixin } from "../../utils/mixin";
import Scroll from '../../components/Scroll'
import ShelfSearch from '../../components/shelf/ShelfSearch'
import ShelfTitle from '../../components/shelf/ShelfTitle'
import ShelfList from '../../components/shelf/ShelfList'
import {shelf} from '.././../api/store'
import {appendAddToShelf} from '../../utils/store'
import ShelfFooter from '../../components/shelf/ShelfFooter'
export default {
  data () {
    return {
      scrollBottom:0
    };
  },
 
  watch: {
    isEditMode(isEditMode){
      this.scrollBottom=isEditMode?48:0
      this.$nextTick(()=>{
        this.$refs.scroll.refresh()
      })
      
    }
  },
  mounted() {
    this.getShelfList()
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
    },
    getShelfList() {
      shelf().then(res=>{
        console.log(res)
        if(res.status===200&&res.data&&res.data.bookList){
          console.log(res.data.bookList)
          this.setShelfList(appendAddToShelf(res.data.bookList))
        }
      })
    }
  },
  mixins: [storeShelfMixin],
  components:{
    ShelfTitle,
    Scroll,
    ShelfSearch,
    ShelfList,
    ShelfFooter
  }

}

</script>
<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.store-shelf{
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: #fff;
    .store-shelf-scroll-wrapper{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 101;
    }
}
</style>