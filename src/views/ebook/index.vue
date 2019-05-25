<template>
  <div class="book">
      <ebook-reader></ebook-reader>
      <ebook-title></ebook-title>
      <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/Reader'
import EbookTitle from '../../components/ebook/Title'
import EbookMenu from '../../components/ebook/Menu'
export default {
  data () {
    return {
    };
  },
  components:{
    EbookReader,
    EbookTitle,
    EbookMenu
  }

}

</script>
<style lang='scss' scoped>
</style>