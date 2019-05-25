<template>
  <div class="ebook_reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin.js";
import Epub from "epubjs";
import {getFontFamily, saveFontFamily, getFontSize, saveFontSize, getTheme, saveTheme} from '../../utils/localStorage';

global.ePub = Epub;
export default {
  data() {
    return {

    };
  },
 
  mixins:[ebookMixin],
  mounted() { 
    // console.log(this.$route.params.fileName);
    const fileName = this.$route.params.fileName.split("|").join("/");
    // console.log(fileName);
    this.setFileName(fileName).then(() => {
      this.initEpub();
    });
  },
  methods: {
    prevPage() {
      if(this.rendition){
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    nextPage() {
      if(this.rendition){
        this.rendition.next()
        this.hideTitleAndMenu()
        // console.log('next')
      }
    },
    showTitleAndMenu() {
      if(this.menuShow){
        this.setsettingShow(-1)
        this.setFontFamilyVisible(false)
      }
      this.setMenuShow(!this.menuShow)
    },
    hideTitleAndMenu() {
      this.setMenuShow(false)
      this.setsettingShow(-1)
      this.setFontFamilyVisible(false)
    },
    initFontSize() {
      //获取fontSize
      let fontSize= getFontSize(this.fileName)
      if(!fontSize){
        saveFontSize(this.fileName,this.defaultFontSize)
      }else{
        this.currentBook.rendition.themes.fontSize(fontSize+'px');
        this.setdefaultFontSize(fontSize)
      }
    },
    initFontFamily() {
       //获取fontFamily
      let font= getFontFamily(this.fileName)
      if(!font){
        saveFontFamily(this.fileName,this.defaultFontFamily)
      }else{
        this.currentBook.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    //初始化主题
    initTheme() {
      //有主题就获取，没有的话就设置一个默认的并保存
      let defaultTheme=getTheme(this.fileName)
      if(!defaultTheme){
        defaultTheme=this.themeList[0].name
        this.setDefaultTheme(defaultTheme)
        saveTheme(this.fileName,defaultTheme)
      }
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name,theme.style)
      });
      this.rendition.themes.select(defaultTheme)
    },

    initEpub() {
      const baseUrl =
        "http://192.168.1.107:8081/epub/" + this.fileName + ".epub";
      // console.log(baseUrl); 
      this.book = new Epub(baseUrl);
     
      console.log(this.book);
      this.rendition = this.book.renderTo('read',{
        width: innerWidth,
        height: innerHeight, 
      });
      this.setCurrentBook(this.book)
      this.rendition.display().then(()=>{
        this.initFontFamily()
        this.initFontSize()
        this.initTheme()
      })
      this.rendition.on('touchstart',event=>{
        this.touchStartX=event.changedTouches[0].clientX
        this.touchStartTime=event.timeStamp
      })
      this.rendition.on('touchend',event=>{
        // console.log(event)
        const touchX = event.changedTouches[0].clientX-this.touchStartX
        const time = event.timeStamp-this.touchStartTime
        if(time<500&&touchX>40){
          this.prevPage()
        }else if(time<500&&touchX<-40){
          this.nextPage()
        }else{
          this.showTitleAndMenu()
        }
        // event.preventDefault();
        event.stopPropagation();
      })
      this.rendition.hooks.content.register(contents=>{
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/tangerine.css`)
        ]).then(()=>{
          // console.log('加载完毕')
        })
      })
    }
  }
};
</script>
<style lang='scss' scoped>
  *{
   touch-action: pan-x;
}
</style>