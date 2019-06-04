import Vue from 'vue'
import CreateAPI from 'vue-create-api'
import Toast from '../components/common/Toast.vue'
import Popup from '../components/common/Popup.vue'
import GroupDialog from '../components/shelf/ShelfGroupDialog.vue'
//通过API的形式调用Toast
Vue.use(CreateAPI)
Vue.createAPI(Toast,true)
Vue.createAPI(Popup,true)
Vue.createAPI(GroupDialog,true)
//方法混入全局
Vue.mixin({
    methods:{
      toast(settings){
        return  this.$createToast({
            $props:settings
        }).show()
      },
      popup(settings){
        return  this.$createPopup({
            $props:settings
        }).show()
      },
      simpleToast(text) {
        const toast= this.toast({
              text,
          })
          toast.show()
          toast.updateText(text)
      },
      dialog() {
        return this.$createGroupDialog()
      }
    }
})