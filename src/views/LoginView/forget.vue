<template>
  <div class="forget">
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="手机号码">
        <el-input v-model="formLabelAlign.phone" clearable />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="formLabelAlign.password"
                  clearable
                  type="password"
                  placeholder="请输入6位密码"
                  show-password/>
      </el-form-item>
      <el-button round @click="onSubmit">重置</el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {defineComponent, reactive, ref, toRefs} from 'vue'

const labelPosition = ref('left')

const formLabelAlign = reactive({
  phone: '',
  password: '',
})

const onSubmit = ()=> {

}

</script>

<style scoped>
.forget {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>