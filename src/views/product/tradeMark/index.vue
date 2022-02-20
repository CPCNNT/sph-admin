<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0">添加</el-button>
    <!-- 表格组件
      data 表格组件将来要展示的数据（数组类型）
      border 表格边框
      label 显示的标题
      width 列的宽度
      align 标题对齐的方式 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="prop" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column prop="prop" label="品牌名称" width="width"></el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width"></el-table-column>
      <el-table-column prop="prop" label="操作" width="width"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination></el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'tradeMark'
  }
</script>

<style lang="sass" scoped></style>
