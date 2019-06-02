<template>
  <div class="store-shelf">
    <shelf-title></shelf-title>
    <scroll class="store-shelf-scroll-wrapper" :top='0' @onScroll='onScroll' >
      <shelf-search></shelf-search>
      <shelf-list></shelf-list>
    </scroll>
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
export default {
  data () {
    return {
    };
  },
  watch: {
    
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
          this.setShelfList(res.data.bookList)
        }
      })
    }
  },
  mixins: [storeShelfMixin],
  components:{
    ShelfTitle,
    Scroll,
    ShelfSearch,
    ShelfList
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