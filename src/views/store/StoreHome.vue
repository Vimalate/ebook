<template>
 <div class="store-home">
     <search-bar></search-bar>
     <scroll :top='scrollTop' @onScroll='onScroll' ref="scroll">
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
         <div>11111111111111111</div>
     </scroll>
 </div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar'
import Scroll from '../../components/Scroll'
import {storeHomeMixin} from '../../utils/mixin'
export default {
mixins:[storeHomeMixin],
 data() {
  return {
      scrollTop:94
  }
 },
 methods: {
     onScroll(offsetY) {
         this.setOffsetY(offsetY)
         if(offsetY>0){
             this.scrollTop=52
         }else{
             this.scrollTop=94
         }
         this.$refs.scroll.refresh()
     }
 },
 components: {
     SearchBar,
     Scroll
 }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/global.scss';
.store-home{ 
    height: 100%;
    width: 100%;
}
</style>
