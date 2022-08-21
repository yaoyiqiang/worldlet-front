<template>
  <el-scrollbar class="demo" max-height="100%">
    <table cellspacing="1px" cellpadding="10px">
      <tr>
        <td>ID</td>
        <td>账号</td>
        <td>密码</td>
        <td>性别</td>
        <td>头像</td>
      </tr>
      <tr v-for="list in UserList" :key="list.id">
        <td>{{ list.id }}</td>
        <td>{{ list.username }}</td>
        <td>{{ list.password }}</td>
        <td>{{ list.sex }}</td>
        <td>{{ list.head }}</td>
      </tr>
    </table>
  </el-scrollbar>
</template>

<script lang="js">
import { defineComponent,reactive,toRefs } from "vue";
import { getAll } from "@/api/Request/user.ts";

export default defineComponent({
  name: "Main",
  components: {

  },
  setup () {
    const data = reactive({
      KeyWord: '',
      QueryParams: {
        query: ''
      },
      UserList: []
    })
    // const List = ()=>{
    //   getAll(data.QueryParams.query).then(res => {
    //     if (res.data){
    //       console.log("数据",res)
    //     }
    //     data.UserList = res.data
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }
    //初始化
    List();
    return {
      ...toRefs(data),
      List,
    }

  }
})
</script>