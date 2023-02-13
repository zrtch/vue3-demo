<template>
  <div class="line">
    <div class="line_item"></div>
    <div id="myEcharts3"></div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
export default {
  name: 'right3',
  setup() {
    /// 声明定义一下echart
    let echart = echarts

    onMounted(() => {
      initChart()
    })

    onUnmounted(() => {
      echart.dispose
    })

    // 基础配置一下Echarts
    function initChart() {
      let chart = echart.init(document.getElementById('myEcharts3'))
      // 把配置和数据放这里
      chart.setOption({
        color: ['#22FFF2', '#03B615', '#B11006', '#975FE4'],
        tooltip: {
          backgroundColor: 'rgba(4,39,88,0.8);',
          borderColor: '#1E90FF',
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          textStyle: {
            color: '#fff',
          },
        },
        legend: {
          top: 16,
          right: '4%',
          itemGap: 20,
          itemWidth: 12,
          itemHeight: 2,
          icon: 'rect',
          textStyle: {
            fontSize: 14,
            color: '#B4C0CC',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#3C4D53',
            },
          },
          axisLabel: {
            textStyle: {
              color: '#B4C0CC',
            },
          },
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#B4C0CC',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#3C4D53',
              type: 'dashed',
              width: '1', //坐标线的宽度
            },
          },
        },
        series: [
          {
            name: '共享资源',
            type: 'line',
            smooth: true,
            data: [120, 300, 101, 134, 90, 230, 210],
          },
          {
            name: '开放资源',
            type: 'line',
            smooth: true,
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: '申请能力',
            type: 'line',
            smooth: true,

            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: '新上架能力',
            type: 'line',
            smooth: true,
            data: [320, 332, 301, 334, 390, 330, 320],
          },
        ],
      })
      window.onresize = function () {
        //自适应大小
        chart.resize()
      }
    }

    return { initChart }
  },
}
</script>

<style lang="less">
.line {
  position: relative;
  &_item {
    position: absolute;
    top: 10px;
    width: 84px;
    height: 32px;
    border-radius: 4px;
    opacity: 1;
    background: linear-gradient(
      180deg,
      rgba(3, 59, 143, 1) 0%,
      rgba(3, 59, 143, 0) 100%
    );
  }
  #myEcharts3 {
    width: 100%;
    height: 300px;
  }
}
</style>
