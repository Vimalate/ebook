<template>
  <div class="loading">
      <div class="ebook-loading">
      <div class="ebook-loading-wrapper">
          <div class="ebook-loading-item" v-for="(item, index) in data" :key="index">
              <div class="ebook-loading-line-wrapper" v-for="(subItem, subIndex) in item" :key="subIndex">
                  <div class="ebook-loading-line"></div>
                  <div class="ebook-loading-mask"></div>
              </div>
          </div>
          <div class="ebook-loading-center"></div>
      </div>

  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        data:[
            [{},{},{}],
            [{},{},{}]
        ]
    };
  },

}

</script>
<style lang='scss' scoped>
@import "../../assets/styles/global";
.loading{
    width: 100%;
    height: px2rem(667);
    @include center;
}
.ebook-loading{
    position: relative;
    z-index: 400;
    width: px2rem(63);
    height: px2rem(40);
    background: transparent;
    border: px2rem(2) solid #d7d7d7;
    border-radius: px2rem(5);
    .ebook-loading-wrapper{
        display: flex;
        height: 100%;
        width: 100%;
        .ebook-loading-item{
            height: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: px2rem(7) 0;
            box-sizing: border-box;
            .ebook-loading-line-wrapper{
                padding:0 px2rem(7);
                box-sizing: border-box;
                flex: 1;
                @include left;
                height: 100%;
                .ebook-loading-line{
                    flex: 0 0 px2rem(16);
                    width: px2rem(16);
                    height: px2rem(2);
                    background-color: #d7d7d7;
            }
                .ebook-loading-mask{
                    flex: 0 0 0;
                    width: 0;
                    height: px2rem(2);
                }
        }
    }
}
}
.ebook-loading-center{
            position: absolute;
            left: 50%;
            top: 0; 
            width: px2rem(2);
            height: px2rem(40);
            background-color: #d7d7d7;
        }
</style>