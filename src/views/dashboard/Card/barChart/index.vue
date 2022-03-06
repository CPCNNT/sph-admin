<template>
  <div class="chart" ref="chart"></div>
</template>

<script>
import mixin from "@/views/dashboard/mixin"

export default {
  name: 'BarChart',
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
        series: {
          type: 'bar',
          data: [20,28,9,12,25,40,22,27,10,13,24,25]
        },
        grid: {
          show: false,
          left: 0,
          right: 0,
          top: 0,
          bottom: "15%"
        },
        tooltip: {}
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
