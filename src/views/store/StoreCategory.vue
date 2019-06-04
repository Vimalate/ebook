<template>
  <div class="store-shelf">
    <shelf-title :title="shelfCategory.title" :ifShowBack="true"></shelf-title>
    <scroll
      class="store-shelf-scroll-wrapper"
      :top="0"
      :bottom="scrollBottom"
      @onScroll="onScroll"
      ref="scroll"
       v-if="ifShowList"
    >
      <shelf-list :top="42" :data="shelfCategory.itemList"></shelf-list>
    </scroll>
    <div class="epty-view" v-else>{{$t('shelf.groupNone')}}</div>
    <shelf-footer></shelf-footer>
  </div>
</template>

<script>
import { storeShelfMixin } from "../../utils/mixin";
// import { storeHomeMixin } from "../../utils/mixin";
import Scroll from "../../components/Scroll";
import ShelfTitle from "../../components/shelf/ShelfTitle";
import ShelfList from "../../components/shelf/ShelfList";
// import {appendAddToShelf} from '../../utils/store'
import ShelfFooter from "../../components/shelf/ShelfFooter";
// import {getBookShelf, saveBookShelf} from '../../utils/localStorage'
export default {
  data() {
    return {
      scrollBottom: 0
    };
  },

  watch: {
    isEditMode(isEditMode) {
      this.scrollBottom = isEditMode ? 48 : 0;
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    }
  },
  mounted() {
    this.getShelfList();
    this.getCategoryList(this.$route.query.title);
    this.setCurrentType(2);
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY);
    }
  },
  computed: {
    ifShowList() {
        return this.shelfCategory.itemList &&
          this.shelfCategory.itemList.length > 0
      }
  },
  mixins: [storeShelfMixin],
  components: {
    ShelfTitle,
    Scroll,
    ShelfList,
    ShelfFooter
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.store-shelf {
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: #fff;
  .store-shelf-scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
  }
  .epty-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: px2rem(16);
    color: #333;
    @include center;
  }
}
</style>