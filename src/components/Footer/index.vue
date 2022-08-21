<template>
  <div class="footer">
    <router-link to="/">首页</router-link>|
    <router-link to="/about">关于</router-link><br>
    <span>{{msg}}</span>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data() {
    return {
      msg: 'Version 1.0.0'
    }
  },
};
</script>

<style scoped lang="scss">
.footer {
  width: 1200px;
  height: auto;
  margin: auto;
  border-top: lavender solid 2px;
  padding-top: 5px;
  text-align: center;
}

a {
  text-decoration: none;
  color: #2c3e50;
  font-size: 14px;
  padding: 0 10px;

  &.router-link-exact-active {
    text-decoration: none;
    color: darkorange;
  }
}

</style>