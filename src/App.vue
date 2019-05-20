<template>
  <div id="app">
    <span class="text">ABCDE</span>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "app",
  components: {},
  computed: {
    
  },
  mounted() {
   
  },
};
document.addEventListener("DOMContentLoaded", () => {
  const html = document.querySelector("html");
  let fontSize = window.innerWidth / 10;
  fontSize = fontSize > 50 ? 50 : fontSize;
  html.style.fontSize = fontSize + "px";
}); 
</script>

<style scoped lang='scss'>
@import './assets/styles/global.scss'; 

</style>
