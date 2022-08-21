import Axios from '../axios';

export const userInfo = ()=> Axios({
  url: '/queryByToken',
  method: 'get'
});

export const login = (data:any)=> Axios({
  url: '/login',
  method: 'post',
  data
})

export const register = (data:any)=> Axios({
  url: '/register',
  method: 'post',
  data
})