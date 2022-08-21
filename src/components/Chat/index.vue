<template>
  <!--聊天框阴影-->
  <div max-height="100%" class="chat" :style="{ boxShadow: `var(${getCssVarName('dark')})`, }">
    <!--聊天框头部-->
    <div class="person" @click="drawer = true">
      <span style="margin-left: 16px">在线人数：{{num}}</span>
      <span></span>
      <span style="margin-right: 16px"><el-icon :size="20"><Expand /></el-icon></span>
    </div>
    <!--点击头部打开抽屉-->
    <el-drawer v-model="drawer" title="在线成员" :with-header="true" size="20%">
      <!--去重临时数组并打印-->

      <el-avatar :size="50" :src='Url' @error="errorHandler" :style="{border: 'solid #71c9ce 1px'}">
        <img
          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        />
      </el-avatar>
      {{name}}
    </el-drawer>

    <!--聊天框消息显示区-->
    <el-scrollbar id="message" ref="myScrollbar" max-height="100%">
      <!--遍历临时数组并打印-->
      <div class="show_msg" v-for="item in msg" :key="item">
        <!--如果状态码为101，说明是用户消息，否则为系统消息-->
        <div v-if="item.code === '101'">
          <!--如果手机号和自己相同，消息框靠右边，否则靠左边-->
          <div v-if="item.phone === phone" class="self_box">
            <el-avatar :size="50" :src='Url' @error="errorHandler" :style="{border: 'solid #71c9ce 1px'}">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
            <div>
              <span v-if="item.sex === '1'"><el-icon :size="15" color="#aa96da"><Male /></el-icon></span>
              <span v-else><el-icon :size="15" color="#fcbad3"><Female /></el-icon></span>
              <span class="nick">{{item.nick}}</span>
              <div class="self_msg">{{item.msg}}</div>
            </div>
          </div>


          <div v-else class="other_box">
            <div>
              <el-avatar :size="50" :src='Url' @error="errorHandler" :style="{border: 'solid #71c9ce 1px'}">
                <img
                  src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                />
              </el-avatar>
            </div>
            <div style="width: auto">
              <span class="nick">{{item.nick}}</span>
              <span v-if="item.sex === '1'"><el-icon :size="15" color="#aa96da"><Male /></el-icon></span>
              <span v-else><el-icon :size="15" color="#fcbad3"><Female /></el-icon></span>
              <div class="other_msg">{{item.msg}}</div>
            </div>
          </div>
        </div>

        <div v-else class="notification">
          - - - - {{item.nick}}{{item.msg}} - - - -
        </div>
      </div>

      <!--定位神器-->
      <div style="text-align: center">
        <a id="dw">
          <el-icon class="is-loading">
            <Loading />
          </el-icon>
          <br/>
        </a>
        <br/>.
      </div>
    </el-scrollbar>

    <!--输入框-->
    <div class="input">
      <el-input
        v-model="textarea"
        :rows="1"
        clearable
        maxlength="30"
        placeholder="发不出消息就刷新一下"
        show-word-limit
        type="textarea"
        :style="{ width: '80%' }"
        resize="none"
        :input-style="{ color: '#00adb5', fontFamily: '楷体', overflow: 'hidden'}"
      />
      <!--发送按钮-->
      <el-button @click="send(nick)" :style="{margin: '0 0 0 5px'}" :icon="ChatLineRound" circle />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ElMessage} from 'element-plus';
import {ref, onMounted, computed, onUnmounted, onBeforeUnmount, onBeforeMount, nextTick, watch,watchEffect} from 'vue'
import {useStore} from "vuex";
import {ChatLineRound} from '@element-plus/icons-vue';


const store = useStore()

//输入框值
let textarea = ref('')

let msg = ref([])

let newMsg = ref([])

//websocket全局变量
let ws: any
let json: any

//先声明传过来的参数为空
let num = ref('')
let url = ref('')
let name = ref('')
let watchMsg = ref('')

//抽屉默认值
const drawer = ref(false)



//边框阴影
const getCssVarName = (type: string) => {
  return `--el-box-shadow${type ? '-' : ''}${type}`
}

const phone = computed(() => {
  if (store.state.login.userInfo) {
    return store.state.login.userInfo.phone
  }
})

const nick = computed(() => {
  if (store.state.login.userInfo) {
    return store.state.login.userInfo.nickName
  }
})

const sex = computed(() => {
  if (store.state.login.userInfo) {
    return store.state.login.userInfo.sex
  }
})

const head = computed(() => {
  if (store.state.login.userInfo) {
    return store.state.login.userInfo.headUrl
  }
})

//组件渲染前的钩子函数
onMounted(() => {

  // 打开一个 web socket
  ws = new WebSocket("ws://152.67.205.3:55453/chat/" + phone.value + "/" + nick.value + "/" + sex.value + "/" + head.value);

  ws.onopen = () => {
    // Web Socket 已连接上
    ElMessage({
      showClose: true,
      message: '聊天服务已连接',
      type: 'success',
    })
  };

  ws.onmessage = (evt: any) => {
    json = JSON.parse(evt.data)

    //在线人数提取出来
    num.value = json.person
    url.value = json.head
    name.value = json.nick
    watchMsg.value = json.msg


    msg.value.push(json as never)

    console.log(evt.data)
  };

  ws.onclose = () => {
    // 关闭 websocket
    ws.close()
    ElMessage({
      showClose: true,
      message: '聊天服务已断开',
      type: 'warning',
    })
  };
})



//监听消息，有新消息时下拉滚动条
watch(watchMsg,(newQuestion, oldQuestion)=>{
  const bt = document.querySelector('#dw')
  if (bt) {
    bt.scrollIntoView({
      behavior: 'smooth'
    })
  }
})

//获取的头像拼接
const Url = computed(() => {
  return 'http://152.67.205.3:62450/head/' + url.value
  // return 'http://localhost:8080/head/' + url.value
})

//组件销毁前的钩子函数
onBeforeUnmount(() => {
  console.log('退出聊天了')
  ws.close()
})

onUnmounted(() => {
  console.log('退出聊天了')
  ws.close()
})

//向服务器发消息的函数
const send = (nick: any) => {
  ws.send(textarea.value)
  textarea.value = ''
}


</script>

<style scoped lang="scss">

.chat {
  width: 300px;
  height: 95%;
  word-break: break-all;
  border-radius: 1em;
  font-family: "微軟正黑體 Light";
  color: lightslategrey;
}

//单独垂直居中
.chat:nth-child(3) {
  align-self: center;
}

.person {
  width: 100%;
  height: auto;
  padding: 10px 0;
  border-bottom: #c9b0c5 1px dashed;
  display: flex;
  justify-content: space-between;
}

.input {
  width: 100%;
  height: 10%;
  text-align: center;
}

#message {
  width: 100%;
  height: 80%;
  text-align: center;
}

.show_msg {
  width: 98%;
  height: auto;

}

.notification {
  text-align: center;
  font-size: 10px;
  font-family: 微软雅黑;
  color: #5dd9be;
  width: 100%;
}

.other_box {
  display: flex;
  width: 100%;
  margin-bottom: 5px;
  text-align: left;
  padding-left: 5px;
}

.other_msg {
  border-radius: 1em;
  background-color: #b2d1ff;
  margin-top: 5px;
  padding: 5px;
  width: auto;
  font-family: 楷体;
  text-align: left;
}

.self_box {
  width: 100%;
  float: right;
  display: flex;
  margin-bottom: 5px;
  flex-direction: row-reverse;
  text-align: right;
}

.self_msg {
  border-radius: 1em;
  background-color: #ff9ed8;
  margin-top: 5px;
  padding: 5px;
  width: auto;
  text-align: right;
  font-family: 华文行楷;
}

.nick {
  font-size: 14px;
  color: #7f7918;
  font-family: 黑体;
}

#dw {
  height: 50px;
}

</style>