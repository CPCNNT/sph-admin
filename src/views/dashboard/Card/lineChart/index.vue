<template>
  <div class="chart" ref="chart"></div>
</template>

<script>
  import mixin from "@/views/dashboard/mixin"

  export default {
    name: "LineChart",
    mixins: [mixin],
    data() {
      return {
        setOption: {
          xAxis: {
            show: false,
            type: "category"
          },
          yAxis: {
            show: false
          },
          series: [
            {
              type: "line",
              data: [25, 10, 35, 12, 20, 15, 36, 21, 18, 15, 30, 16, 9, 10, 17, 22],
              itemStyle: {
                // 折线拐点标志的样式。
                opacity: 0 // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
              },
              lineStyle: {
                // 线条样式
                color: "#a081d7"
              },
              areaStyle: {
                // 区域填充样式。设置后显示成区域面积图。
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#a081d7" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "white" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              },
              smooth: true
            }
          ],
          grid: {
            show: false,
            left: 0,
            right: 0,
            top: 0,
            bottom: "15%"
          }
        }
      }
    }
  }
</script>

<style scoped>
  .chart {
    width: 100%;
    height: 100%;
  }
</style>
