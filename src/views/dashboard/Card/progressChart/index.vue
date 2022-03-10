<template>
  <div class="chart" ref="chart"></div>
</template>

<script>
  import mixin from '@/utils/mixin'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ProgressChart',
    mixins: [mixin],
    computed: {
      ...mapGetters(['activityRate']),
      setOption() {
        return {
          xAxis: {
            show: false,
            min: 0,
            max: 100
          },
          yAxis: {
            show: false,
            type: 'category'
          },
          series: {
            type: 'bar',
            data: [this.activityRate],
            barWidth: '25%',
            color: 'yellowgreen',
            showBackground: true,
            label: {
              show: true,
              formatter: '|',
              position: 'right'
            }
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
