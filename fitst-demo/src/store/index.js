import { createStore } from 'vuex'

// Vuex 数据管理框架
// VueX创建了一个全局唯一的仓库，用来存放全局的数据
// 1. dispatch方法，派发一个action，名字叫做change
// 2. 感知到change这个action，执行store 中actions下面的change方法
// 3. commit 提交一个叫做change 的数据改变
// 4. mutation感知到提交的change改变，执行change方法改变数据
export default createStore({
  state: {
    name: "hello"
  },
  mutations: {
    // 第四步，对应的mutation被执行
    change() {
      // 第五步，在mutation里面修改数据
      this.state.name = 'lee'
    }
  },
  actions: {
    // 第二步, store感知到你出发了一个叫做change的action，执行change方法
    change() {
      //第三步，提交一个commit 触发一个 mutation
      this.commit('change')
    }
  },
  modules: {
  }
})
