<template>
  <div>
    <div class="header">
      <span>{{ title }}</span>
      <svg t="1646362090482" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13046" width="16" height="16"><path d="M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0zM512 928c-229.75 0-416-186.25-416-416S282.25 96 512 96s416 186.25 416 416S741.75 928 512 928z" p-id="13047" fill="lightgrey"></path><path d="M537.64 343.452c47.074 0 83.266-37.528 83.266-78.072 0-32.46-20.832-60.878-62.496-60.878-54.816 0-82.178 44.618-82.178 77.11C475.144 320.132 498.152 343.452 537.64 343.452z" p-id="13048" fill="lightgrey"></path><path d="M533.162 728.934c-7.648 0-10.914-10.136-3.264-39.55l43.25-166.406c16.386-60.848 10.944-100.398-21.92-100.398-39.456 0-131.458 39.83-211.458 107.798l16.416 27.392c25.246-17.256 67.906-34.762 77.792-34.762 7.648 0 6.56 10.168 0 35.508l-37.746 158.292c-23.008 89.266 1.088 109.538 33.984 109.538 32.864 0 117.808-30.47 195.57-109.632l-18.656-25.34C575.354 716.714 543.05 728.934 533.162 728.934z" p-id="13049" fill="lightgrey"></path></svg>
    </div>
    <div class="main">
      <span>{{ data[0]  | splitNumByComma }}</span>
      <span>{{ data[1] | toPositive }}%</span>
      <span v-if="data[1] > 0" style="color: red;">&#9650;</span>
      <span v-else style="color: rgb(26, 250, 41);">&#9660;</span>
    </div>
    <div class="footer">
      <div class="chart" ref="chart"></div>
    </div>
  </div>
</template>

<script>
  import mixin from '@/utils/mixin'

  export default {
    name: 'LineChart',
    mixins: [mixin],
    props: ['title', 'data'],
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
              data: [25, 10, 15, 12, 20, 15, 36, 30, 25, 15, 30, 16, 9, 10, 22],
              itemStyle: {
                // 折线拐点标志的样式。
                opacity: 0 // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
              },
              lineStyle: {
                // 线条样式
                color: "#409EFF"
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
                      color: "#409EFF" // 0% 处的颜色
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
  .header {
    display: flex;
    align-items: center;
  }
  .header span:first-child {
    margin-right: 16px;
    color: darkgrey;
  }
  .main {
    margin-top: 20px;
  }
  .main span:first-child {
    font-size: 2em;
  }
  .main span:nth-child(2) {
    margin-left: 40px;
  }
  .main span:nth-child(3) {
    margin-left: 4px;
  }
  .chart {
    width: 100%;
    height: 100px;
  }
  .footer {
    margin-top: 20px;
  }
</style>
