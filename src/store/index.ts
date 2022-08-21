import { createStore } from "vuex";
import login from "@/store/login";

export default createStore({
  state: {},//数据存储
  getters: {},//计算属性，简化仓库数据
  mutations: {},//修改state
  actions: {},//处理业务逻辑，异步
  modules: {//小仓库
    login
  },
});
