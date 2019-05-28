<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "app",
  components: {},
  computed: {},
  methods: {

  },
  mounted() {
    
    document.addEventListener(
    "touchmove",
    function(e) {
      e.preventDefault(),
      { passive: false }
    },
    false
  );
  }
};
document.addEventListener("DOMContentLoaded", () => {
  const html = document.querySelector("html");
  let fontSize = window.innerWidth / 10;
  fontSize = fontSize > 50 ? 50 : fontSize;
  html.style.fontSize = fontSize + "px";
   
 
});

 
    // function stopScrolling( touchEvent ) {   
    //     touchEvent.preventDefault(); 
    //     console.log('stop') 
        
    // }  
    // document.addEventListener( 'touchstart' , stopScrolling , false );  
    // document.addEventListener( 'touchmove' , stopScrolling , false ); 
      


</script>

<style scoped lang='scss'>
@import "./assets/styles/global.scss";
 * { touch-action: pan-y; } 
#app {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background: #7d8188;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
  }
</style>
