<template>
  <div class="shelf-item shelf-item-shadow">
    <component :is="item" :data='data'></component>
  </div>
</template>

<script>
import {storeShelfMixin} from '../../utils/mixin'
import ShelfBook from './ShelfItemBook'
import ShelfAdd from './ShelfItemAdd'
import ShelfCategory from './ShelfItemCategory'
export default {
  data () {
    return {
      book:ShelfBook,
      category:ShelfCategory,
      add:ShelfAdd
    };
  },
  computed: {
    //根据.data.type实现动态组件
    item() {
    return  this.data.type===1?this.book:(this.data.type===2?this.category:add)
    }
  },
    mixins:[storeShelfMixin],
  props:{
      data:Object
  }

}

</script>
<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.shelf-item{
  width: 100%;
  height: 100%;
  // background-color:red;
  &.shelf-item-shadow{
    box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, 0.3)
  }
}
</style>