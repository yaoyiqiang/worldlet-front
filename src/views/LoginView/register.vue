<template>
  <div class="register">
    <el-form
      ref="ruleFormRef"
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
      :rules="rules"
      status-icon
    >
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="formLabelAlign.nickName" clearable />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formLabelAlign.phone" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formLabelAlign.password"
                  clearable
                  type="password"
                  placeholder="请输入6位密码"
                  show-password/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="formLabelAlign.sex" text-color="#fcbad3">
          <el-radio label="1">男 <el-icon><Male /></el-icon></el-radio>
          <el-radio label="0">女 <el-icon><Female /></el-icon></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="头像" prop="headUrl">
        <el-select v-model="formLabelAlign.headUrl" clearable placeholder="固定可选">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-button round @click="checkForm(ruleFormRef)">注册</el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref, computed, readonly} from 'vue'
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const store = useStore();
const router = useRouter();

const labelPosition = ref('left')

const formLabelAlign = reactive({
  nickName: '',
  phone: '',
  password: '',
  sex: '1',
  headUrl: '',
})

//头像下拉选项
const value = ref('')
const options = [
  {
    value: 'girl1.jpg',
    label: '女生头像1',
  },
  {
    value: 'girl2.jpg',
    label: '女生头像2',
  },
  {
    value: 'girl3.jpg',
    label: '女生头像3',
  },
  {
    value: 'dog1.jpg',
    label: '汪1',
  },
  {
    value: 'dog2.jpg',
    label: '汪2',
  },
  {
    value: 'cat1.jpg',
    label: '喵1',
  },
  {
    value: 'cat2.jpg',
    label: '喵2',
  },
  {
    value: 'pink1.jpg',
    label: '粉头1',
  },
  {
    value: 'pink2.png',
    label: '粉头2',
  },
  {
    value: 'pink3.png',
    label: '粉头3',
  },
  {
    value: 'gif1.gif',
    label: '动态头1',
  },
  {
    value: 'gif2.gif',
    label: '动态头2',
  },
  {
    value: 'boy1.jpg',
    label: '男生头像1',
  },
  {
    value: 'boy2.jpg',
    label: '男生头像2',
  },
  {
    value: '8.jpg',
    label: '奥力给，干了',
  },
  {
    value: 'cxk.jpg',
    label: '你干嘛啊~',
  },
  {
    value: 'lixin.jpg',
    label: '我就是太阳',
  },
]

//表单校验
const checkForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      register()
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

//注册函数
const register = async ()=> {
  const {nickName, phone, password, sex, headUrl} = formLabelAlign;
  await store.dispatch('register', {
    nickName,
    phone,
    password,
    sex,
    headUrl
  })

  switch (computed(() => store.state.login.code).value) {
    case '9002':
      ElMessage({
        showClose: true,
        message: '手机号已注册',
        type: 'warning',
      })
      break
    case '202':
      router.push('/login')
      ElMessage({
        showClose: true,
        message: '注册成功',
        type: 'success',
      })
      break
  }
}

//校验规则
const rules = reactive<FormRules>({
  nickName: [
    {required: true, message: '请输入昵称', trigger: 'change'},
    {min: 1, max: 6, message: '不超过6位', trigger: 'change'}
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'change' },
    { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'change' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 6, max: 6, message: '请输入六位密码', trigger: 'change',},
  ],
  headUrl: [
    {
      required: true,
      message: '请选择头像',
      trigger: 'change',
    },
  ],
})

</script>


<style scoped>
.register {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>