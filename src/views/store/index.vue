<template>
 <div class="store">
     <router-view></router-view>
 </div>
</template>

<script>
export default {
 data() {
  return {

  }
 },
 components: {

 }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/global.scss';
.store{
    background-color: #fff;
    width: 100%;
    height: 100%;
}
</style>
