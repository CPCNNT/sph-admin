import * as echarts from "echarts"

export default {
  data() {
    return {
      echartsInstance: null,
      resizeObserver: null
    }
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
  beforeDestroy() {
    this.resizeObserver.disconnect()
  }
}
