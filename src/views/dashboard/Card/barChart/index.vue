<template>
  <div class="chart" ref="chart"></div>
</template>

<script>
  import mixin from '@/utils/mixin'
  import { mapGetters } from 'vuex'

  export default {
    name: 'BarChart',
    mixins: [mixin],
    computed: {
      ...mapGetters(['payTrend']),
      setOption() {
        return {
          xAxis: {
            show: false,
            type: 'category'
          },
          yAxis: {
            show: false
          },
          series: {
            type: 'bar',
            data: this.payTrend
          },
          grid: {
            show: false,
            left: 0,
            right: 0,
            top: 0,
            bottom: '15%'
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
