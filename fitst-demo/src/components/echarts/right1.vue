<template>
  <div id="myEcharts1"></div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
export default {
  name: 'right1',
  setup() {
    // 声明定义一下echart
    let echart = echarts

    onMounted(() => {
      initChart()
    })

    onUnmounted(() => {
      echart.dispose
    })

    // 基础配置一下Echarts
    function initChart() {
      let chart = echart.init(document.getElementById('myEcharts1'))
      chart.setOption({
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
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        legend: {
          top: 16,
          right: '4%',
          itemGap: 20,
          itemWidth: 12,
          itemHeight: 6,
          icon: 'rect',
          textStyle: {
            fontSize: 14,
            color: '#B4C0CC',
          },
        },
        dataset: {
          source: [
            ['专业公司', 43.3, 85.8, 50],
            ['数字体系', 83.1, 73.4, 20],
            ['省市电信', 86.4, 65.2, 20],
          ],
        },
        xAxis: {
          axisLabel: {
            textStyle: {
              color: '#B4C0CC',
            },
          },

          splitLine: {
            show: true,
            textStyle: {
              color: '#B4C0CC',
            },
            lineStyle: {
              color: '#3C4D53',
              type: 'dashed',
              width: '1', //坐标线的宽度
            },
          },
        },
        yAxis: {
          type: 'category',
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#3C4D53',
            },
          },
          axisLabel: {
            textStyle: {
              color: '#B4C0CC',
            },
            interval: 0,
            formatter: function (value) {
              var ret = '' //拼接加\n返回的类目项
              var maxLength = 2 //每项显示文字个数
              var valLength = value.length //X轴类目项的文字个数
              var rowN = Math.ceil(valLength / maxLength) //类目项需要换行的行数
              if (rowN > 1) {
                //如果类目项的文字大于5,
                for (var i = 0; i < rowN; i++) {
                  var temp = '' //每次截取的字符串
                  var start = i * maxLength //开始截取的位置
                  var end = start + maxLength //结束截取的位置
                  //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                  temp = value.substring(start, end) + '\n'
                  ret += temp //凭借最终的字符串
                }
                return ret
              } else {
                return value
              }
            },
          },
        },
        series: [
          {
            name: '提供量',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(24,144,255,1)',
                },
                {
                  offset: 1,
                  color: 'rgba(24,144,255,0.3)',
                },
              ]),
              borderRadius: [0, 10, 10, 0],
            },
          },
          {
            name: '调用量',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                {
                  offset: 0,
                  color: 'rgba(14,160,107,1)',
                },
                {
                  offset: 1,
                  color: 'rgba(14,160,107,0.3)',
                },
              ]),
              borderRadius: [0, 10, 10, 0],
            },
          },
          {
            name: '申请量',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255,171,45,1)',
                },
                {
                  offset: 1,
                  color: 'rgba(255,171,45,0.3)',
                },
              ]),
              borderRadius: [0, 10, 10, 0],
            },
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
#myEcharts1 {
  width: 100%;
  height: 300px;
}
</style>
