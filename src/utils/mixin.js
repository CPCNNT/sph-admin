import * as echarts from "echarts"
import { mapState } from "vuex"

export default {
  data() {
    return {
      echartsInstance: null,
      resizeObserver: null
    }
  },
  computed: {
    ...mapState({
      dashboardData: state => state.dashboard.dashboardData
    })
  },
  mounted() {
    this.echartsInstance = echarts.init(this.$refs.chart)
    // console.log(this)
    this.echartsInstance.setOption(this.setOption)
    let canResize = true
    this.resizeObserver = new ResizeObserver(entries => {
      if (!canResize) {
        return
      }
      canResize = false
      setTimeout(() => {
        this.echartsInstance.resize()
        canResize = true
        // console.log('延迟器触发了')
      }, 300)
    })
    this.resizeObserver.observe(this.$refs.chart)
    // this.$once('hook:beforeDestroy', () => {
    //   this.resizeObserver.disconnect()
    // })
  },
  watch: {
    dashboardData() {
      this.echartsInstance.setOption(this.setOption)
    }
  },
  beforeDestroy() {
    this.resizeObserver.disconnect()
  }
}
