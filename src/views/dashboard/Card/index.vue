<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额">
            <template slot="content">
              ¥ {{ salesTotal | splitNumByComma }}
            </template>
            <template slot="charts">
              <span></span>
              <span class="line">
                <span
                  >月同比 {{ salesGrowthLastMonth | toPositive }}%
                  <span v-if="salesGrowthLastMonth > 0" style="color: red"
                    >&#9650;</span
                  ><span v-else style="color: rgb(26, 250, 41)"
                    >&#9660;</span
                  ></span
                >
                <span
                  >日同比 {{ salesGrowthLastDay | toPositive }}%
                  <span v-if="salesGrowthLastDay > 0" style="color: red"
                    >&#9650;</span
                  ><span v-else style="color: rgb(26, 250, 41)"
                    >&#9660;</span
                  ></span
                >
                <span></span>
              </span>
            </template>
            <template slot="footer">
              <span>今日销售额 ¥ {{ salesToday | splitNumByComma }}</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="总访问量">
            <template slot="content">
              {{ visitTotal | splitNumByComma }}
            </template>
            <template slot="charts">
              <LineChart />
            </template>
            <template slot="footer">
              <span>今日访问量 {{ visitToday | splitNumByComma }}</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数">
            <template slot="content">
              {{ payTotal | splitNumByComma }}
            </template>
            <template slot="charts">
              <BarChart />
            </template>
            <template slot="footer">
              <span>转化率 {{ payRate }}%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果">
            <template slot="content"> {{ activityRate }}% </template>
            <template slot="charts">
              <ProgressChart />
            </template>
            <template slot="footer">
              <span class="line">
                <span
                  >月同比 {{ activityGrowthLastMonth | toPositive }}%
                  <span v-if="activityGrowthLastMonth > 0" style="color: red"
                    >&#9650;</span
                  ><span v-else style="color: rgb(26, 250, 41)"
                    >&#9660;</span
                  ></span
                >
                <span
                  >日同比 {{ activityGrowthLastDay | toPositive }}%
                  <span v-if="activityGrowthLastDay > 0" style="color: red"
                    >&#9650;</span
                  ><span v-else style="color: rgb(26, 250, 41)"
                    >&#9660;</span
                  ></span
                >
                <span></span>
              </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Detail from './Detail'
  import LineChart from './lineChart'
  import BarChart from './barChart'
  import ProgressChart from './progressChart'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Card',
    components: { Detail, LineChart, BarChart, ProgressChart },
    computed: {
      ...mapGetters([
        'salesTotal',
        'salesToday',
        'salesGrowthLastDay',
        'salesGrowthLastMonth',
        'visitTotal',
        'visitToday',
        'payTotal',
        'payRate',
        'activityRate',
        'activityGrowthLastDay',
        'activityGrowthLastMonth'
      ])
    }
  }
</script>

<style scoped>
  .line {
    display: flex;
    justify-content: space-between;
  }
</style>
