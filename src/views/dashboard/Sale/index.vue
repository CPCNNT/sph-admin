<template>
  <el-card class="box-card" style="margin: 20px 0 0">
    <div slot="header" class="clearfix">
      <!-- 头部左侧 -->
      <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
        <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧 -->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          class="date"
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          value-format="yyyy-MM-dd"
          format="yyyy 年 MM 月 dd 日"
        ></el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="chart" ref="chart"></div>
        </el-col>
        <el-col :span="6">
          <div style="padding-bottom: 20px">门店{{ activeName }}排名</div>
          <ol>
            <li v-for="item in rankData" :key="item.no">
              <span>{{ item.no }}</span>
              <span>{{ item.name }}</span>
              <span>{{ item.money }}</span>
            </li>
          </ol>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
  import mixin from '@/utils/mixin'
  import dayjs from 'dayjs'
  import { mapGetters } from 'vuex'

  export default {
    name: "Sale",
    mixins: [mixin],
    data() {
      return {
        activeName: "销售额",
        date: [],
        format: 'YYYY-MM-DD'
      }
    },
    computed: {
      ...mapGetters([
        'orderFullYearAxis',
        'userFullYearAxis',
        'orderFullYear',
        'userFullYear',
        'orderRank',
        'userRank'
      ]),
      setOption() {
        return {
          title: {
            text: `${this.activeName}趋势`,
            textStyle: {
              fontSize: "1em",
              fontWeight: "bold"
            }
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {
            left: "3%",
            right: "3%",
            bottom: "0%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: this.activeName === '销售额' ? this.orderFullYearAxis : this.userFullYearAxis,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: this.activeName,
              type: "bar",
              barWidth: "35%",
              data: this.activeName === '销售额' ? this.orderFullYear : this.userFullYear
            }
          ]
        }
      },
      rankData() {
        return this.activeName === '销售额' ? this.orderRank : this.userRank
      }
    },
    methods: {
      handleClick(tab, event) {
        this.echartsInstance.setOption(this.setOption)
      },
      setDay() {
        const day = dayjs().format(this.format)
        this.date = [day, day]
      },
      setWeek() {
        var isoWeek = require('dayjs/plugin/isoWeek')
        dayjs.extend(isoWeek)
        const start = dayjs().isoWeekday(1).format(this.format)
        const end = dayjs().isoWeekday(7).format(this.format)
        this.date = [start, end]
      },
      setMonth() {
        const start = dayjs().startOf('month').format(this.format)
        const end = dayjs().endOf('month').format(this.format)
        this.date = [start, end]
      },
      setYear() {
        const start = dayjs().startOf('year').format(this.format)
        const end = dayjs().endOf('year').format(this.format)
        this.date = [start, end]
      }
    }
  }
</script>

<style scoped>
  ::v-deep .el-card__header {
    border-bottom: none;
  }

  .clearfix {
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  .tab {
    width: 100%;
  }

  .right {
    position: absolute;
    right: 0;
  }

  .right span {
    color: #409EFF;
    cursor: pointer;
  }

  .right span:hover {
    color: black;
  }

  .date {
    width: 320px;
    margin: 0 15px;
  }

  .right span {
    margin: 0 15px;
  }

  .chart {
    width: 100%;
    height: 300px;
  }

  ::v-deep #tab-销售额 {
    font-size: 20px;
    padding-right: 10px;
  }

  ::v-deep #tab-访问量 {
    font-size: 20px;
    padding-left: 10px;
  }

  ol {
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
  }

  ol li {
    height: 8%;
    margin: 20px 0;
  }

  li span:first-child {
    float: left;
    text-align: center;
    width: 18px;
    height: 18px;
    margin-right: 50px;
  }

  ol li:nth-child(-n + 3) span:first-child {
    border-radius: 50%;
    background: black;
    color: white;
  }

  li span:last-child {
    float: right;
    padding-right: 10px;
  }
</style>
