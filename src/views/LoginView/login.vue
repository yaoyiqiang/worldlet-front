<template>
  <div class="login">
    <el-form
      ref="ruleFormRef"
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
      :rules="rules"
      status-icon
    >
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="formLabelAlign.phone" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formLabelAlign.password"
                  clearable
                  type="password"
                  placeholder="请输入6位密码"
                  show-password />
      </el-form-item>
      <el-button round @click="checkForm(ruleFormRef)" >登录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref, readonly, computed} from 'vue'
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElMessage} from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const store = useStore()
const route = useRouter()

const labelPosition = ref('left')

const formLabelAlign = reactive({
  phone: '',
  password: '',
})

//表单校验
const checkForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      login()
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

//登录函数
const login = async () => {
  const {phone, password} = formLabelAlign
  console.log('准备派发action：')
  await store.dispatch('login',{ phone, password })
  console.log('action执行结束应该已经存入token：')
  switch (store.state.login.code) {
    case '9000':
      ElMessage({
        showClose: true,
        message: '手机号未注册',
        type: 'warning',
      })
      break
    case '9001':
      ElMessage({
        showClose: true,
        message: '密码错误',
        type: 'warning',
      })
      break
    case '201':
      console.log('准备跳转')
      route.push('/')
      ElMessage({
        showClose: true,
        message: '登录成功',
        type: 'success',
      })
      break
  }
}

//校验规则
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'change' },
    { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'change' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 6, max: 6, message: '请输入六位密码', trigger: 'change',},
  ],
})

</script>

<style scoped>
.login {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
