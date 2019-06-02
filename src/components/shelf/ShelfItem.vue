<template>
  <div class="shelf-item " 
  :class="{'shelf-item-shadow':data.type===1||data.type===2}"
  @click="onItemClick">
    <component :is="item" :data='data' :class="{'is-edit':isEditMode&&data.type===2}" class="shelf-item-comp">

    </component>
    <div class="icon-selected" :class="{'is-selected':data.selected}" v-show="isEditMode&&data.type===1"></div>
  </div>
</template>

<script>
import {storeShelfMixin} from '../../utils/mixin'
import ShelfBook from './ShelfItemBook'
import ShelfAdd from './ShelfItemAdd'
import ShelfCategory from './ShelfItemCategory'
import {gotoStoreHome} from '../../utils/store'
export default {
  data () {
    return {
      book:ShelfBook,
      category:ShelfCategory,
      add:ShelfAdd
    };
  },
  methods: {
    onItemClick() {
      if(this.isEditMode){
        this.data.selected=!this.data.selected
        if(this.data.selected){
          this.shelfSelected.pushWithoutDuplicate(this.data)
        }else{
          //选中的书id和已有的重复则去除
          this.setShelfSelected(this.shelfSelected.filter(item=>item.id!==this.data.id))
        }
      }else{
        if(this.data.type===1){
        this.showBookDetail(this.data)
      }else if(this.data.type===2){

      }else{
        gotoStoreHome(this)
      }
      }
      
    }
  },
  computed: {
    //根据.data.type实现动态组件
    item() {
    return  this.data.type===1?this.book:(this.data.type===2?this.category:this.add)
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
  position: relative;
  width: 100%;
  height: 100%;
  // background-color:red;
  &.shelf-item-shadow{
    box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, 0.3)
  }
  .shelf-item-comp{
    opacity: 1;
    &.is-edit{
      opacity: .5;
    }
  }
  .icon-selected{
    position: absolute;
    bottom: px2rem(2);
    right: px2rem(2);
    font-size: px2rem(18);
    color: rgba(0, 0, 0, 0.4);
    &.is-selected{
      color: $color-blue;
    }
  }
}
</style>