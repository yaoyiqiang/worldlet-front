<template>
  <div class="puzzle" :style="{width : width + 'px', height : height + 'px'}">
    <div
      class="puzzle__block"
      v-for="(item, index) in blockPoints"
      :key="item.id"
      :style="{
             width: blockWidth + 'px',
             height: blockHeight + 'px',
             left: item.x + 'px',
             top: item.y + 'px',
             backgroundImage:`url(${img})`,
             backgroundPosition:`-${correctPoints[index].x}px  -${correctPoints[index].y}px`,
             opacity:index === blockPoints.length - 1 && 0
         }"
      @click="handleClick"
      :ref="index === blockPoints.length - 1 ? 'empty' : 'block'"
      :data-correctX = "correctPoints[index].x"
      :data-correctY = "correctPoints[index].y"
    >

    </div>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    row: {
      type: Number,
      default: 3
    },
    col: {
      type: Number,
      default: 3
    },
    img: {
      type: String,
      required: true
    }
  },
  computed: {
    //小块的宽度
    blockWidth (){
      return this.width / this.col;
    },
    //小块的高度
    blockHeight (){
      return this.height / this.row;
    },
    //
    correctPoints(){
      const { row,blockWidth, blockHeight } = this;
      const arr = [];
      for(let i = 0; i < row; i++){
        for(let j = 0; j < row; j++){
          arr.push({
            x : j * blockWidth,
            y: i * blockHeight,
            id: new Date().getTime() + Math.random() *100
          })
        }
      }
      return arr;
    },
    blockPoints (){
      const points = this.correctPoints;
      const length = points.length;
      const lastEle = points[length - 1];
      const newArr = [...points];
      newArr.length = length - 1;
      newArr.sort(() => Math.random() -0.5);
      newArr.push(lastEle);
      return newArr;
    }
  },
  methods: {
    handleClick(e){
      const blockDom = e.target;
      const emptyDom = this.$refs.empty[0];
      if(!this.isAdjacent(blockDom,emptyDom)){
        return;
      }
      const {left , top} = blockDom.style;
      blockDom.style.left = emptyDom.style.left;
      blockDom.style.top = emptyDom.style.top;
      emptyDom.style.left = left;
      emptyDom.style.top = top;
      const winFlag = this.checkWin();
      if(winFlag){
        // console.log('success');
        this.winGame(emptyDom);
      }
    },
    //判断是否可以满足交换条件
    isAdjacent(blockDom,emptyDom){
      const {left:domLeft, top:domTop, width, height } = blockDom.style;
      const {left:emptyLeft, top: emptyTop} = emptyDom.style;
      const xDis = Math.floor(Math.abs(parseFloat(domLeft) - parseFloat(emptyLeft)));
      const yDis = Math.floor(Math.abs(parseFloat(domTop) - parseFloat(emptyTop)));
      const flag = (domLeft === emptyLeft && yDis ===parseInt(height))
        || (domTop === emptyTop && xDis === parseInt(width));
      return flag;
    },
    //  判断成功，每一个小块的现坐标和原坐标都相等
    checkWin() {
      const blockDomArr = this.$refs.block;
      return blockDomArr.every(dom => {
        const {left:domLeft, top:domTop} = dom.style;
        const {correctx:correctX, correcty:correctY} = dom.dataset;
        const  flag =  parseInt(domLeft) === parseInt(correctX) && parseInt(domTop) === parseInt(correctY);
        // console.log(flag);
        return flag;
      })
    },
    //拼图成功
    winGame(emptyDom) {
      setTimeout(()=>{
        alert('you are so great!');
        emptyDom.style.opacity = 1;
        setTimeout(() => {
          this.goToNextLevel();
        },300)
      },300)
    },
    //进入下一关
    goToNextLevel(){
      console.log('aaa');
      const answerFlag = window.confirm('继续下一关？');
      if(answerFlag){
        this.$emit('next');
      }
    }
  }
}
</script>
<style>
.puzzle{
  border:1px solid #ffb5f3;
  position: relative;
}
.puzzle__block{
  box-sizing: border-box;
  background-color: #efe1ff;
  position: absolute;
  border: 1px solid white;
  transition: all .3s;
}
</style>
