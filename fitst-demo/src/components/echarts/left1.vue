<template>
  <div class="left_top">
    <div class="left_top_pie" ref="pieChart"></div>
    <div class="left_top_world" ref="worldChart"></div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'
export default {
  name: 'right2',
  setup() {
    // 声明定义一下echart
    let echart = echarts

    let piedata = [
      { value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' },
      { value: 580, name: 'Email' },
      { value: 484, name: 'Union Ads' },
      { value: 300, name: 'Video Ads' },
    ]

    onMounted(() => {
      initChart()
    })

    onUnmounted(() => {
      echart.dispose
    })

    let pieChart = ref(null)

    // 基础配置一下Echarts
    function initChart() {
      let chart = echart.init(pieChart.value)
      chart.setOption({
        color: ['#103DDB', '#2B8EF3', '#EBC23D', '#6BBC2C', '#A24FF6'],
        grid: {
          height: '90%',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          type: 'scroll',
          itemHeight: 14,
          itemWidth: 14,
          orient: 'vertical',
          top: 'center',
          pageTextStyle: {
            color: '#fff',
          },
          right: '1%',
          textStyle: {
            align: 'left',
            color: '#',
            verticalAlign: 'middle',
            rich: {
              name: {
                width: 80,
                fontSize: 12,
                color: '#fff',
              },
              value: {
                width: 20,
                align: 'right',
                fontFamily: 'Medium',
                fontSize: 12,
                color: '#fff',
              },
              rate: { width: 10, align: 'right', fontSize: 12 },
            },
          },
          data: piedata,
          formatter: (name) => {
            console.log(piedata)
            if (piedata.length) {
              const item = piedata.filter((item) => item.name === name)[0]
              return `{name|${name}} |   {value| ${item.value}}`
            }
          },
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['36%', '44%'],
            center: ['34%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: piedata,
          },
        ],
      })
      window.onresize = function () {
        //自适应大小
        chart.resize()
      }
    }

    return { pieChart, initChart }
  },
}
</script>

<style lang="less" scoped>
.left_top {
  width: calc(100% - 198px);
  height: 100%;
  display: flex;
  &_pie {
    width: 50%;
    height: 100%;
  }
  &_world {
    width: 50%;
    height: 100%;
  }
}
</style>
