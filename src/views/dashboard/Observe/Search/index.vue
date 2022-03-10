<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <div class="search-header">
          <span>线上热门搜索</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-more el-icon--right more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="12">
            <LineChart title="搜索用户数" :data="[12321, 17.1]" />
          </el-col>
          <el-col :span="12">
            <LineChart title="人均搜索次数" :data="[2.7, -26.2]" />
          </el-col>
        </el-row>
      </div>
      <el-table
        :data="searchWord"
        style="width: 100%; margin-top: 20px"
        :default-sort="{ prop: 'count', order: 'descending' }"
        max-height="200px"
        border
      >
        <el-table-column type="index" label="排名" width="80"></el-table-column>
        <el-table-column prop="word" label="搜索关键字"></el-table-column>
        <el-table-column prop="user" label="用户数" sortable></el-table-column>
        <el-table-column prop="count" label="周涨幅" sortable></el-table-column>
      </el-table>
      <el-pagination
        layout="->, prev, pager, next"
        :total="1000"
        style="margin-top: 20px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import LineChart from './lineChart'

  export default {
    name: 'Search',
    components: { LineChart },
    computed: {
      ...mapGetters(['searchWord'])
    }
  }
</script>

<style scoped>
  .search-header {
    display: flex;
    justify-content: space-between;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .more:hover {
    color: #409eff;
  }
</style>
