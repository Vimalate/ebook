<template>
 <div class="store-home">
     <search-bar></search-bar>
     <flap-card :data='random'></flap-card>
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
import FlapCard from '../../components/home/FlapCart'
import Scroll from '../../components/Scroll'
import {storeHomeMixin} from '../../utils/mixin'
import {home} from '../../api/store'
export default {
mixins:[storeHomeMixin],
 data() {
  return {
      scrollTop:94,
      random:null
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
     Scroll,
     FlapCard
 },
 mounted() {
     home().then((res)=>{
         if(res&&res.status===200){
             const data=res.data
             //获取随机一本书
             const randomIndex= Math.floor(Math.random()*data.random.length)
             
             //保存获取到的书
             this.random=data.random[randomIndex]
             console.log(this.random)
         }
     })
 },
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/global.scss';
.store-home{ 
    height: 100%;
    width: 100%;
}
</style>
