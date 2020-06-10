import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    token: '',
    cartArr: JSON.parse(window.localStorage.getItem('cartArr')) || []
  },
  mutations: {
    // 设置token
    SETTOKEN(state,token) {
      state.token = token;
    },
    // 增加购物车商品
    ADDTOCART(state,label) {
      let tarProd = state.cartArr.find(item => item.label == label);
      if(tarProd) {
        tarProd.count++;
      } else {
        state.cartArr.push({label,count:1});
      }
    },
    // 减少购物车商品
    REDUCETOCART(state,label) {
      let tarProd = state.cartArr.find(item => item.label == label);
      if(tarProd) {
        if(tarProd.count>0) {
          tarProd.count--;
        } else {
          tarProd.count = 0;
        }
      } else {
        state.cartArr.push({label,count:1});
      }
      
    }
  },
  actions: {
    setToken({commit},token) {
      commit('SETTOKEN',token);
    },
    addToCart({commit},label) {
      commit('ADDTOCART',label);
      console.log('add')
    },
    reduceToCart({commit},label) {
      commit('REDUCETOCART',label);
    }
  },
  // 相当于vue中的computed
  getters: {
    cartNums(state) {
      let num = 0;
      state.cartArr.forEach(item => {
        num += item.count;
      })
      return num;
    }
  }
})

// 数据持久化，刷新的时候vuex的数据仍存在
// store.subscribe(handler)是监听mutation的，每次调用mutation都会进入这里
store.subscribe(function(mutation,state) {
  console.log('o')
  window.localStorage.setItem('cartArr',JSON.stringify(state.cartArr));
})

export default store;
