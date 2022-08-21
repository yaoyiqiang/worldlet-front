<template>
  <div class="loginView">
    <nav>
      <router-link to="/login">登录</router-link>|
      <router-link to="/login/register">注册</router-link>|
      <router-link to="/login/forget">忘记密码</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.loginView {
  width: 100%;
  height: 450px;
  text-align: center;
}

nav {
  margin: 30px;
}

a {
  text-decoration: none;
  color: rgba(179, 135, 255, 0.99);
  font-size: 20px;
  font-weight: bolder;
  padding: 0 10px;

  &.router-link-exact-active {
    text-decoration: none;
    color: #ff5ef4;
  }
}
</style>