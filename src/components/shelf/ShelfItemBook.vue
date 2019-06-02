<template>
 <div class="shelf-item-book">
     <img :src="data.cover" alt="" class="shelf-item-book-cover">
 </div>
</template>

<script>
export default {
 data() {
  return {

  }
 },
 props:{
     data:Object
 },
 components: {

 }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.shelf-item-book{
    width: 100%;
    height: 100%;
    .shelf-item-book-cover{
        width: 100%;
        height: 100%;
    }
}
</style>
