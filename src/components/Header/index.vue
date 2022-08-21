<template>
  <div class="header">
    <img alt="小世界" src="../../assets/bg/logo.png" class="logo" />
    <img alt="购物" src="../../assets/bg/shopping.gif" class="logo" />
    <img alt="加载" src="../../assets/bg/loading.png" class="logo" />
    <img alt="小风车" src="../../assets/bg/windmill.gif" class="logo" />

    <!--判断是否已登录-->
    <div v-if="token" class="header_right">
      <!--退出按钮的悬停提示-->
      <el-tooltip
        effect="light"
        content="退出并清除缓存"
        placement="left"
      >
        <router-link to="/login" @click="logout">
          <el-icon :size="30" color="#f38181">
            <SwitchButton />
          </el-icon>
        </router-link>
      </el-tooltip>

      <!--夜间模式切换-->
      <el-switch
        @click="toggleDark()"
        v-model="bgSwitch"
        size="large"
        inline-prompt
        style="--el-switch-on-color: #f07bff; --el-switch-off-color: #aa82ff"
        active-text="昼"
        inactive-text="夜"
      />

      <!--显示头像和无法获取到时的默认头像-->
      <div class="user">
        <el-avatar :size="80" :src='head' @error="errorHandler" :style="{border: 'solid #71c9ce 1px'}">
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          />
        </el-avatar>
        <!--显示昵称和性别-->
        <div class="namesex">
          <span class="name">{{nick}}</span><br />
          <span v-if="sex === '1'"><el-icon :size="25" color="#aa96da"><Male /></el-icon></span>
          <span v-else><el-icon :size="25" color="#fcbad3"><Female /></el-icon></span>
        </div>
        <p></p>
      </div>
    </div>

    <!--未登录时-->
    <div v-else class="header_right">
      <el-switch
        @click="toggleDark()"
        v-model="bgSwitch"
        size="large"
        inline-prompt
        style="--el-switch-on-color: #f07bff; --el-switch-off-color: #aa82ff"
        active-text="昼"
        inactive-text="夜"
      />
      <a>您好！请先登录 / 注册</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ElMessage} from "element-plus";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ref, computed, onBeforeMount, onMounted, nextTick, onActivated} from "vue";
import { useDark, useToggle } from '@vueuse/core'

//夜间模式默认值
const bgSwitch = ref(true)
//夜间模式的css样式
const isDark = useDark()
const toggleDark = useToggle(isDark)
//头像加载失败处理
const errorHandler = () => false
//路由和仓库
const store = useStore();
const router = useRouter();


//退出函数
const logout = () => {
  //派发action
  store.dispatch('logout')
  ElMessage({
    showClose: true,
    message: '缓存已清除，请重新登录',
    type: 'success',
  })
}

const token = computed( ()=>{
  return store.state.login.token
})

const userInfo = computed(async ()=>{
  if (token.value){
    console.log('派发userInfo的action前')
    //派发提交userInfo的action
    await store.dispatch('userInfo');
    console.log('userInfo派发结束，userInfo应该已经存入',store.state.login.userInfo)
  }else {
    console.log(token.value,'没有')
  }
  return store.state.login.userInfo
})

console.log('取出userInfo下的所有数据',userInfo.value)

const nick = computed(() => {
  if (store.state.login.userInfo){
    return store.state.login.userInfo.nickName
  }
})
const head = computed(() => {
  if (store.state.login.userInfo){
    let url = 'http://152.67.205.3:62450/head/'+ store.state.login.userInfo.headUrl
    // let url = 'http://localhost:8080/head/'+ store.state.login.userInfo.headUrl
    return url
  }
})
const sex = computed(() => {
  if (store.state.login.userInfo){
    return store.state.login.userInfo.sex
  }
})
console.log('是否取出head',head.value)
console.log('是否取出nick',nick.value)
console.log('是否取出sex',sex.value)


// onMounted( ()=>{
//   console.log('这是onMounted')
//
//
// })
//
onBeforeMount( ()=>{
  userInfo
  console.log('这是onBeforeMount')
})

</script>

<style scoped lang="scss">
.header {
  width: 1200px;
  height: 85px;
  margin: auto auto;
  text-align: left;
  border-bottom: lavender solid 3px;
  display: flex;
  justify-content: space-between; //左右靠边,中间等分
  align-items: center; //垂直居中

}

.header_right {
  width: 400px;
  display: flex;
  justify-content: space-between; //左右靠边,中间等分
  align-items: center; //垂直居中

}

.user {
  width: auto;
  height: auto;
  margin: 0 50px;
  text-align: center;
  display: flex;
  align-items: center; //垂直居中
}

.namesex {
  height: 100%;
  margin: 0 10px;
}

.name {
  font-family: 方正舒体;
  color: darkorange;
  font-size: 20px;
}

a {
  text-decoration: none;
  color: #23a1d4;
  font-size: 20px;
  font-weight: bold;
  padding: 0 10px;

  &.router-link-exact-active {
    text-decoration: none;
    color: #f83da0;
  }
}

.logo {
  height: 100%;
  width: auto;
}


</style>
