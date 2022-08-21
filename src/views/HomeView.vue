<template>
  <div class="home">
    <Aside />
    <Main />
    <Chat />
  </div>
</template>

<script lang="ts">
import Aside from '@/components/Aside/index.vue';
import Main from '@/components/Main/index.vue';
import Chat from '@/components/Chat/index.vue';

export default {
  name: "HomeView",
  components: {
    Aside,
    Main,
    Chat
  }
}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 450px;
  display: flex;
}

</style>