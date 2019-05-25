import {
    mapGetters,
    mapActions
} from 'vuex'
import {
    themeList
} from './book.js'
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
        ])
    },
}