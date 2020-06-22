import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const store =new Vuex.Store({
    state:{//共享数据
        userInfo:''//用户信息
    }
    
})
export default store