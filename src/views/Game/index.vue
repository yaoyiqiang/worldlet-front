<template>
  <div>
    <!-- 子组件通过自己触发next事件与父组件进行通信 -->
    <d-puzzle v-bind="puzzleConfig[level]" @next = "handleNext"></d-puzzle>
  </div>
</template>
<script>
import DPuzzle from './puzzle.vue'
export default {
  components:{
    DPuzzle
  },
  data() {
    return {
      level : 0,  //难易程度
      puzzleConfig :[
        {row: 3, col: 3, img: 'src/assets/Game/0.jpg'},
        {row: 4, col: 4, img: '../../assets/Game/1.jpg'},
        {row: 5, col: 5, img: '../../assets/Game/2.jpg'},
        {row: 6, col: 6, img: '../../assets/Game/3.jpg'},
        {row: 8, col: 8, img: '../../assets/Game/4.jpg'},
      ]
    }
  },
  methods:{
    // 父组件监听到当前事件成功，通过handleNext控制关卡
    handleNext(){
      this.level ++;
      if(this.level == this.puzzleConfig.length){
        const answerFlag = window.confirm('已经是最后一关了，是否重新开始？');
        if(answerFlag){
          this.level = 0;
        }
      }
      // console.log('next');

    }
  }
}
</script>

