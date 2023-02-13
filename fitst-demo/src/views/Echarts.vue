<template>
  <div class="echarts">
    <div class="left"></div>
    <div class="right">
      <right1 />
      <right2 />
      <right3 />
    </div>
  </div>
</template>

<script>
import right1 from '../components/echarts/right1.vue'
import right2 from '../components/echarts/right2.vue'
import right3 from '../components/echarts/right3.vue'
export default {
  name: 'echartsBox',
  components: { right1, right2, right3 },
  setup() {},
}
</script>

<style lang="less">
.echarts {
  width: 100%;
  height: 8;
  display: flex;
  background: linear-gradient(
    90deg,
    rgba(1, 7, 21, 1) 0%,
    rgba(0, 23, 55, 1) 51%,
    rgba(1, 7, 21, 1) 100%
  );
  .left {
    width: 60%;
  }
  .right {
    width: 40%;
  }
}
</style>
