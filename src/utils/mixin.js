import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    themeList,
    addClass,
    removeAllCss,getReadTimeByMinute
} from './book.js'
import {
    saveLocation, getBookmark
} from './localStorage'
export const ebookMixin = {
    computed: {
        ...mapGetters([
            "fileName", 'menuShow', 'settingShow', 'defaultFontSize',
            'defaultFontFamily',
            'fontFamilyVisible',
            'defaultTheme',
            'bookAvailable',
            'progress',
            'section',
            'isPaginating',
            'currentBook',
            'navigation',
            'cover',
            'metadata',
            'paginate',
            'pagelist',
            'offsetY',
            'isBookmark',

        ]),
        themeList() {
            return themeList(this)
        },
        getSectionName() {
            // if (this.section) {
            //   let currentSectionInfo = this.currentBook.section(this.section);
            //   if (currentSectionInfo && currentSectionInfo.href&&this.currentBook.navigation) {
            //     return this.currentBook.navigation.get(currentSectionInfo.href).label;
            //   }
            // }//不能获取二级目录
            if (this.section) {
                const section = this.currentBook.section(this.section)
                if (section && section.href && this.currentBook && this.currentBook.navigation) {
                  // return this.currentBook.navigation.get(section.href).label
                  return this.navigation[this.section].label
                }
              }
            // return this.section?this.navigation[this.section].label:''
          }
    },

    methods: {
        ...mapActions([
            'setMenuShow',
            'setFileName',
            'setsettingShow',
            'setdefaultFontSize',
            'setDefaultFontFamily',
            'setFontFamilyVisible',
            'setDefaultTheme',
            'setBookAvailable',
            'setProgress',
            'setSection',
            'setIsPaginating',
            'setCurrentBook',
            'setNavigation',
            'setCover',
            'setMetadata',
            'setPaginate',
            'setPagelist',
            'setOffsetY',
            'setIsBookmark',
        ]),
        //添加全局样式
        initGlobalStyle() {
            //先移除所有自添加的css主题样式
            removeAllCss()
            switch (this.defaultTheme) {
                case 'Default':
                    addClass(`${process.env.VUE_APP_RES_URL}/fonts/theme/theme_default.css`)
                    break
                case 'Eye':
                    addClass(`${process.env.VUE_APP_RES_URL}/fonts/theme/theme_eye.css`)
                    break
                case 'Gold':
                    addClass(`${process.env.VUE_APP_RES_URL}/fonts/theme/theme_gold.css`)
                    break
                case 'Night':
                    addClass(`${process.env.VUE_APP_RES_URL}/fonts/theme/theme_night.css`)
                    break
                default:
                    addClass(`${process.env.VUE_APP_RES_URL}/fonts/theme/theme_default.css`)
                    break

            }

        },
        //刷新进度条
        refreshLocation() {
            let currentLocation = this.currentBook.rendition.currentLocation();
            if (currentLocation.start && currentLocation.start.index) {
                let startCfi = currentLocation.start.cfi
                let progress = this.currentBook.locations.percentageFromCfi(startCfi);
                this.setProgress(Math.floor(progress * 100));
                this.setSection(currentLocation.start.index)
                saveLocation(this.fileName, startCfi)
                //每次翻页判断是否为书签页
                const bookmark=getBookmark(this.fileName)
                // console.log(bookmark)
                if(bookmark){
                    if(bookmark.some(item=>item.cfi===startCfi)){
                        this.setIsBookmark(true)
                    }else{
                        this.setIsBookmark(false)
                    }
                }else{
                    this.setIsBookmark(false)
                }
            }

        },
        hideTitleAndMenu() {
            this.setMenuShow(false)
            this.setsettingShow(-1)
            this.setFontFamilyVisible(false)
          },
        display(target, callback) {
            if (target) {
                this.currentBook.rendition.display(target).then(() => {
                    this.refreshLocation()
                    if (callback) {
                        callback()
                    }
                })
            } else {
                this.currentBook.rendition.display().then(() => {
                    this.refreshLocation()
                    if (callback) {
                        callback()
                    }
                })
            }
        },
        displayProgress() {
            let cfi = this.currentBook.locations.cfiFromPercentage(
              this.progress / 100
            );
            this.display(cfi)
          },
        //获取已读时间
        getReadTimeText() {
            return this.$t('book.haveRead').replace('$1',getReadTimeByMinute(this.fileName))
        },
    },

}