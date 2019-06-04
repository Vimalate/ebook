<template>
  <div class="shelf-item-category">
    <div class="shelf-item-category-list" v-if="data.itemList.length>0">
      <div class="shelf-item-category-item" v-for="(item, index) in data.itemList" :key="index">
        <img :src="item.cover" alt="" class="shelf-item-category-img">
      </div>
    </div>
    <div class="shelf-item-category-bg" v-else>
      <span class="icon-book2"></span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props:{
    data:Object
  },
  mounted() {
    // console.log(this.data)
  },

}

</script>
<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.shelf-item-category{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .shelf-item-category-bg{
    font-size: px2rem(30);
    width: 100%;
    height: 100%;
    color: #ccc;
    @include center;
    background-color: #fff;
  }
  .shelf-item-category-list{
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    padding-top: px2rem(5);
    box-sizing: border-box;
    .shelf-item-category-item{
      flex: 0 0 33.333%;
      width: 33.333%;
      height: 33.333%;
      &:nth-child(3n+1){
        padding:0 px2rem(2.5) px2rem(5) px2rem(5);
      }
       &:nth-child(3n+2){
        padding:0 px2rem(2.5) px2rem(5) px2rem(2.5);
      }
       &:nth-child(3n+3){
        padding:0 px2rem(5) px2rem(5) px2rem(2.5);
      }
      box-sizing: border-box;
      .shelf-item-category-img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>