<template>
  <div class="echarts">
    <div class="left">
      <div class="left_img">
        <img src="../assets/img1.png" alt="" />
      </div>
      <div class="left_item">
        <div class="left_item_one"></div>
        <div class="left_item_two"></div>
      </div>
      <div class="left_item"></div>
      <div class="left_item"></div>
    </div>
    <div class="right">
      <!-- <right1 /> -->
      <right2 />
      <right3 />
    </div>
  </div>
</template>

<script>
// import right1 from '../components/echarts/right1.vue'
import right2 from '../components/echarts/right2.vue'
import right3 from '../components/echarts/right3.vue'
export default {
  name: 'echartsBox',
  components: { right2, right3 },
  setup() {},
}
</script>

<style lang="less">
.echarts {
  width: 100%;
  height: calc(1080px - 22.5px);
  display: flex;
  background: linear-gradient(
    90deg,
    rgba(1, 7, 21, 1) 0%,
    rgba(0, 23, 55, 1) 51%,
    rgba(1, 7, 21, 1) 100%
  );
  .left {
    width: 60%;
    position: relative;
    &_img {
      position: absolute;
      height: 1015px;
      width: 379px;
      background: url('../assets/img2.png') no-repeat;
      background-size: contain;
      left: 10px;
      img {
        position: absolute;
        top: 16%;
        left: 12%;
      }
    }
    &_item {
      width: 98%;
      height: 32%;
      margin: 6px 6px;
      border: 1px solid #3085cf;
      border-radius: 8px;
      &_one {
        width: 30%;
        height: 100%;
        background: red;
      }
      &_two {
        width: 30%;
        height: 100%;
        background: red;
      }
    }
  }
  .right {
    width: 40%;
  }
}
</style>
