<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="¥ 126560">
            <template slot="charts">
              <span></span>
              <span>
                <span>周同比 56.67% <span style="color: red;">&#9650;</span></span>
                <span style="margin-left: 60px;">日同比 19.16% <span style="color: rgb(26, 250, 41);">&#9660;</span></span>
              </span>
            </template>
            <template slot="footer">
              <span>日销售额 ¥ 12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <LineChart />
            </template>
            <template slot="footer">
              <span>日访问量 1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="98765">
            <template slot="charts">
              <BarChart />
            </template>
            <template slot="footer">
              <span>转化率 65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <ProgressChart />
            </template>
            <template slot="footer">
              <span>
                <span>周同比 12% <span style="color: red;">&#9650;</span></span>
                <span style="margin-left: 60px;">日同比 11% <span style="color: rgb(26, 250, 41);">&#9660;</span></span>
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

export default {
  name: 'Card',
  components: { Detail, LineChart, BarChart, ProgressChart }
}
</script>
