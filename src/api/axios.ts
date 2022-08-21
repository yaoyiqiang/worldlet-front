import axios from 'axios';
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'

let loading: any;
const Axios =axios.create({
  timeout:8000,
  // baseURL: 'http://localhost:8080',
  baseURL: 'http://152.67.205.3:55453',
  headers: {
    'Content-type': 'application/json;charset = utf-8'
  }
})


//请求拦截
Axios.interceptors.request.use(config=>{
  loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(252,241,250,0.7)',
  })
  if (config.headers && localStorage.getItem('token')){
      config.headers.token = localStorage.getItem('token') || ''
  }
  return config;
})

//响应拦截
Axios.interceptors.response.use(response=>{

  loading.close()
  return response;

},error => {

  loading.close()
  ElMessage({
    showClose: true,
    message: '服务器未响应',
    type: 'warning',
  })

})

export default Axios;