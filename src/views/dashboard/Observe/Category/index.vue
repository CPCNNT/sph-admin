<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="category-header">
          <span>销售额类别占比</span>
          <el-radio-group v-model="radio" size="small" @change="change">
            <el-radio-button label="全部渠道"></el-radio-button>
            <el-radio-button label="线上"></el-radio-button>
            <el-radio-button label="门店"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div>
        <div class="chart" ref="chart"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import mixin from '@/utils/mixin'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Category',
    mixins: [mixin],
    data() {
      return {
        radio: '全部渠道',
        data: []
      }
    },
    computed: {
      ...mapGetters(['saleRank']),
      setOption() {
        return {
          // tooltip: {
          //   trigger: 'item'
          // },
          title: {
            text: '',
            subtext: '',
            left: 'center',
            top: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                position: 'outside',
                formatter: '{b}: {c}'
              },
              data: this.data
            }
          ]
        }
      },
      onlineData() {
        return this.saleRank.online.name.map((item, index) => {
          return { name: item, value: this.saleRank.online.value[index] }
        })
      },
      shopData() {
        return this.saleRank.shop.name.map((item, index) => {
          return { name: item, value: this.saleRank.shop.value[index] }
        })
      },
      onlinePlusShopData() {
        return this.onlineData.map((item, index) => {
          return { name: item.name, value: item.value + this.shopData[index].value }
        })
      }
    },
    methods: {
      change(label) {
        if (label === '线上') {
          this.data = this.onlineData
        } else if (label === '门店') {
          this.data = this.shopData
        } else {
          this.data = this.onlinePlusShopData
        }
        this.echartsInstance.setOption(this.setOption)
      }
    },
    mounted() {
      this.echartsInstance.on('mouseover', (params) => {
        const { name, value } = params.data
        this.echartsInstance.setOption({
          title: {
            text: name,
            subtext: value
          }
        })
      })
      this.echartsInstance.on('mouseout', () => {
        this.echartsInstance.setOption({
          title: {
            text: '',
            subtext: ''
          }
        })
      })
    },
    watch: {
      dashboardData() {
        this.data = this.onlinePlusShopData
        this.echartsInstance.setOption(this.setOption)
      }
    }
  }
</script>

<style scoped>
  .category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 18.4px;
  }
  .chart {
    width: 100%;
    height: 467.2px;
  }
</style>
