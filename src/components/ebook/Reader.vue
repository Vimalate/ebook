<template>
  <div class="ebook_reader">
    <div id="read"></div>
  </div>
</template>

<script>
import { ebookMixin } from "../../utils/mixin.js";
import Epub from "epubjs";
import {getFontFamily, saveFontFamily, getFontSize, saveFontSize, getTheme, saveTheme, getLocation} from '../../utils/localStorage';
import {addClass} from '../../utils/book'
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
        this.rendition.prev().then(()=>{
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    nextPage() {
      if(this.rendition){
        this.rendition.next().then(()=>{
          this.refreshLocation()
        })
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
    //获取fontSize
    initFontSize() {
      let fontSize= getFontSize(this.fileName)
      if(!fontSize){
        saveFontSize(this.fileName,this.defaultFontSize)
      }else{
        this.currentBook.rendition.themes.fontSize(fontSize+'px');
        this.setdefaultFontSize(fontSize)
      }
    },
    //获取fontFamil
    initFontFamily() {
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
        saveTheme(this.fileName,defaultTheme)
      }
      //保存获取到的主题样式
      this.setDefaultTheme(defaultTheme)
      //使主题样式生效
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name,theme.style)
      });
      this.rendition.themes.select(defaultTheme)
    },
    
    initRendition() {
      this.rendition = this.book.renderTo('read',{
        width: innerWidth,
        height: innerHeight, 
      });
      const location=getLocation(this.fileName)
      this.display(location,()=>{
        this.initFontFamily()
        this.initFontSize()
        this.initTheme()
        this.initGlobalStyle()
      })
      
    },
    initGesture() {
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
    },
    initEpub() {
      
      const baseUrl =
        process.env.VUE_APP_RES_URL+'/epub/' + this.fileName + ".epub";
      // console.log(baseUrl); 
      this.book = new Epub(baseUrl);
      this.setCurrentBook(this.book)
      this.initRendition()
      this.initGesture()
      this.book.ready.then(()=>{
        return this.book.locations.generate(750*(window.innerWidth/375)*
        (getFontSize(this.fileName)/16))
      }).then((locations)=>{
        // console.log(locations)
       this.setBookAvailable(true)
       this.refreshLocation()
      })
      this.rendition.hooks.content.register(contents=>{
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
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