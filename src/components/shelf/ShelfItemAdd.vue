<template>
  <div class="shelf-item-add">
    <span class="icon-add"></span>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

}

</script>
<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.shelf-item-add{
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: px2rem(1) solid #ccc;
  @include center;
  .icon-add{
    font-size: px2rem(40);
    color: #ccc;
  }
}
</style>