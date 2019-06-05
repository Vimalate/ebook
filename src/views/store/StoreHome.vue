<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :data="random"></flap-card>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div class="banner-wrapper">
        <img class="banner-img" :src="banner" alt>
      </div>
      <guess-you-like :data="guessYouLike"></guess-you-like>
      <recommend :data="recommend" class="recommend"></recommend>
      <featured
        :data="featured"
        :titleText="$t('home.featured')"
        class="featured"
        :btnText="$t('home.seeAll')"
      ></featured>
      <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
        <category-book :data="item"></category-book>
      </div>
      <category :data="categories" class="category"></category>
    </scroll>
  </div>
</template>

<script>
import SearchBar from "../../components/home/SearchBar";
import FlapCard from "../../components/home/FlapCart";
import Scroll from "../../components/Scroll";
import GuessYouLike from "../../components/home/GuessYouLike";
import Recommend from "../../components/home/Recommend";
import Featured from "../../components/home/Featured";
import CategoryBook from "../../components/home/CategoryBook";
import Category from "../../components/home/Category";
import { storeHomeMixin } from "../../utils/mixin";
import { home } from "../../api/store";
export default {
  mixins: [storeHomeMixin],
  data() {
    return {
      scrollTop: 94,
      random: null,
      banner: '',
      guessYouLike: null,
      recommend: null,
      featured: null,
      categoryList: [],
      categories: null
    };
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY);
      if (offsetY > 0) {
        this.scrollTop = 52;
      } else {
        this.scrollTop = 94;
      }
      this.$refs.scroll.refresh();
    }
  },
  components: {
    SearchBar,
    Scroll,
    FlapCard,
    GuessYouLike,
    Recommend,
    Featured,
    CategoryBook,
    Category
  },
  mounted() {
    home().then(res => {
      if (res && res.status === 200) {
        const data = res.data;
        //获取随机一本书
        console.log(data);
        const randomIndex = Math.floor(Math.random() * data.random.length);

        //保存获取到的书
        this.random = data.random[randomIndex];
        this.banner = data.banner;
        this.guessYouLike = data.guessYouLike;
        this.recommend = data.recommend;
        this.featured = data.featured;
        this.categoryList = data.categoryList;
        this.categories = data.categories;
        console.log(this.random);
      }
    });
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/global.scss";
.store-home {
  height: 100%;
  width: 100%;
  .banner-wrapper {
    padding: px2rem(10);
    box-sizing: border-box;
    .banner-img {
      width: 100%;
      height: px2rem(150);
    }
  }
  .recommend {
    margin-top: px2rem(30);
  }
  .featured {
    margin-top: px2rem(20);
  }
  .category-list-wrapper {
    margin-top: px2rem(20);
  }
  .category {
    margin-top: px2rem(20);
  }
}
</style>
