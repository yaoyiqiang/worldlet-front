<template>
  <div class="start">
    <!--走马灯-->
    <el-carousel :interval="4000" type="card" height="400px" style="margin-top: 20px">
      <el-carousel-item v-for="item in imgs" :key="item">
        <img :src="item.value" :alt="item.label" >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts" setup>
const imgs = [
  {
    value: require('../../../public/head/8.jpg'),
    label: '奥力给，干了',
  },
  {
    value: require('../../../public/head/cxk.jpg'),
    label: '你干嘛~~',
  },
  {
    value: require('../../../public/head/lixin.jpg'),
    label: '我就是太阳',
  },
  {
    value: require('../../../public/head/cat1.jpg'),
    label: '喵',
  },
  {
    value: require('../../../public/head/dog1.jpg'),
    label: '汪',
  },
  {
    value: require('../../../public/head/pink4.jpg'),
    label: '粉头',
  },
]
</script>

<style scoped lang="scss">
.start {
  text-align: center;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

img {
  width: auto;
  height: 400px;
}
</style>