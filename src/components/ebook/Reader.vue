<template>
  <div class="ebook-reader">
    <div id="read"></div>
    <div class="ebook-reader-mask" @click="onMaskClick"
     @touchmove='move' @touchend='moveEnd'></div>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin.js";
import Epub from "epubjs";
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme,
  getLocation
} from "../../utils/localStorage";
import { flatten } from "../../utils/book";
export default {
  data() {
    return {};
  },

  mixins: [ebookMixin],
  mounted() {
    const fileName = this.$route.params.fileName.split("|").join("/");
    // console.log(fileName);
    this.setFileName(fileName).then(() => {
      this.initEpub();
    });
  },
  methods: {
    move(e) {
      let offsetY=0
      if(this.firstOffsetY){
        offsetY=e.changedTouches[0].clientY-this.firstOffsetY
        // console.log(offsetY)
        this.setOffsetY(offsetY)
      }else{
        this.firstOffsetY=e.changedTouches[0].clientY
      }
      e.preventDefault()
      e.stopPropagation()
    },
    moveEnd(e){
      this.setOffsetY(0)
      this.firstOffsetY=0
      // console.log('end')
    },
    //点击翻页功能
    onMaskClick(e) {
      // console.log(e)
      let offsetX=e.offsetX
      let width=window.innerWidth
      if(offsetX>0&&offsetX<width*0.3){
        this.prevPage()
      }else if(offsetX>0&&offsetX>width*0.7){
        this.nextPage()
      }else{
        this.showTitleAndMenu()
      }
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation();
        });
        this.hideTitleAndMenu();
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation();
        });
        this.hideTitleAndMenu();
        // console.log('next')
      }
    },
    showTitleAndMenu() {
      if (this.menuShow) {
        this.setsettingShow(-1);
        this.setFontFamilyVisible(false);
      }
      this.setMenuShow(!this.menuShow);
    },

    //获取fontSize
    initFontSize() {
      let fontSize = getFontSize(this.fileName);
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize);
      } else {
        this.currentBook.rendition.themes.fontSize(fontSize + "px");
        this.setdefaultFontSize(fontSize);
      }
    }, 
    //获取fontFamil
    initFontFamily() {
      let font = getFontFamily(this.fileName);
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily);
      } else {
        this.currentBook.rendition.themes.font(font);
        this.setDefaultFontFamily(font);
      }
    },
    //初始化主题
    initTheme() {
      //有主题就获取，没有的话就设置一个默认的并保存
      let defaultTheme = getTheme(this.fileName);
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name;
        saveTheme(this.fileName, defaultTheme);
      }
      //保存获取到的主题样式
      this.setDefaultTheme(defaultTheme);
      //使主题样式生效
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style);
      });
      this.rendition.themes.select(defaultTheme);
    },

    initRendition() {
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
        // method: "default"
      });
      const location = getLocation(this.fileName);
      console.log(location)
      this.display(location, () => {

        this.initFontFamily();
        this.initFontSize();
        this.initTheme();
        this.initGlobalStyle();
      });
    },
    initGesture() {
      this.rendition.on("touchstart", event => {
        this.touchStartX = event.changedTouches[0].clientX;
        this.touchStartTime = event.timeStamp;
        // event.preventDefault();
        event.stopPropagation();
      });
      this.rendition.on("touchend", event => {
        // console.log(event)
        const touchX = event.changedTouches[0].clientX - this.touchStartX;
        const time = event.timeStamp - this.touchStartTime;
        if (time < 500 && touchX > 40) {
          this.prevPage();
        } else if (time < 500 && touchX < -40) {
          this.nextPage();
        } else {
          this.showTitleAndMenu();
        }
        // event.preventDefault();
        event.stopPropagation();
      });
    },
    parseBook() {
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url);
        });
      });
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata);
        // console.log(url)
      });
      this.book.loaded.navigation.then(nav => {
        const navItem = flatten(nav.toc);
        // console.log(flatten(nav.toc))
        // 层级判断
        function find(item, level = 0) {
          ///判断item.parent是否存在，存在的话level+1，直到找到parentItem.id===item.parent的停止
          return !item.parent
            ? level
            : find(
                navItem.filter(parentItem => parentItem.id === item.parent)[0],
                ++level
              );
        }
        navItem.forEach(item => {
          item.level = find(item);
        });
        // console.log(navItem);
        this.setNavigation(navItem);
      });
    },
    initEpub() {
      const baseUrl =
        process.env.VUE_APP_RES_URL + "/epub/" + this.fileName + ".epub";
      console.log(baseUrl);
      this.book = new Epub(baseUrl);
      this.setCurrentBook(this.book);
      this.initRendition();
      this.initGesture();
      this.parseBook();
      this.book.ready
        .then(() => {
          return this.book.locations.generate(
            750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)
          );
        })
        .then(locations => {
         this.navigation.forEach(nav => {
            nav.pagelist = []
          })
           locations.forEach(item => {
            const loc = item.match(/\[(.*)\]!/)[1]
            console.log(loc)
            this.navigation.forEach(nav => {
              if (nav.href) {
                const href ='A'+ nav.href.match(/^html\/(.*)\.xhtml$/)[1]
                // console.log(href)
                if (href) {
                  if (href=== loc) {
                    nav.pagelist.push(item)
                    // console.log(nav.pagelist)
                  }
                }
              }
            })
            let currentPage = 1
            this.navigation.forEach((nav, index) => {
              if (index === 0) {
                nav.page = 1
              } else {
                nav.page = currentPage
              }
              currentPage += nav.pagelist.length + 1
            })
          })
          // console.log(locations,this.navigation)
          this.setBookAvailable(true);
          this.refreshLocation();
        });
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/cabin.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
          )
        ]).then(() => {
          // console.log('加载完毕')
        });
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/styles/global";
// * {
//   touch-action: pan-x;
//   touch-action: none;
// }
.ebook-reader{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .ebook-reader-mask{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 150;
    top: 0;
    left: 0;
    background-color: transparent;

}
}

</style>