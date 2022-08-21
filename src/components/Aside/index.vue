<template>
  <div class="aside">
    <el-radio-group v-model="isCollapse" style="margin: 10px 0" size="small" fill="#cabbe9">
      <el-radio-button :label="true">
        <el-icon>
          <CaretLeft />
        </el-icon>
      </el-radio-button>
      <el-radio-button :label="false">
        <el-icon>
          <CaretRight />
        </el-icon>
      </el-radio-button>
    </el-radio-group>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :router="true"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon :size="30">
            <Basketball />
          </el-icon>
          <span>一起玩</span>
        </template>
        <el-menu-item-group>
          <template #title><span>烧脑</span></template>
          <el-menu-item index="/puzzle">拼图</el-menu-item>
          <el-menu-item index="/slither">贪吃蛇</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="棋牌">
          <el-menu-item index="/">斗地主</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="/">
          <template #title><span>yellow</span></template>
          <el-menu-item index="/">想什么呢！！！</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="/listen">
        <el-icon :size="30">
          <Service />
        </el-icon>
        <template #title>一起听</template>
      </el-menu-item>
      <el-menu-item index="/video">
        <el-icon :size="30">
          <VideoPlay />
        </el-icon>
        <template #title>一起看</template>
      </el-menu-item>
      <el-menu-item index="/learn">
        <el-icon :size="30">
          <Notebook />
        </el-icon>
        <template #title>一起学</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  VideoPlay,
  Service
} from '@element-plus/icons-vue'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
}

</style>