<template>
  <el-scrollbar class="about" max-height="100%">
    <h1>技术栈</h1>
    <ul>
      <li>前端框架：vue3</li>
      <li>UI风格：Element-plus</li>
      <li>前后端通讯：axios</li>
      <br/><br/>
      <li>后端框架：springboot2</li>
      <li>持久层框架：mybatis-plus</li>
      <li>接口文档：swagger</li>
      <li>数据库：mysql8</li>
    </ul>
  </el-scrollbar>
</template>

<style scoped>
.about {
  height: 450px;
  width: 100%;
  padding: 0 100px;
}

h1 {
  margin-top: 50px;
}

ul li {
  margin-top: 20px;
}
</style>
