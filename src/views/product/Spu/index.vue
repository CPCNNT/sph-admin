<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect :is-show="scene !== 0" @getCategoryId="getCategoryId" />
    </el-card>

    <el-card>
      <div v-show="scene === 0">
        <el-button type="primary" icon="el-icon-plus" @click="addSpu" :disabled="!category3Id">添加 Spu</el-button>

        <el-table style="width: 100%; margin: 20px 0" border :data="spuList">
          <el-table-column type="index" label="序号" width="80px" align="center" />

          <el-table-column prop="spuName" label="Spu 名称" width="200px" />

          <el-table-column prop="description" label="Spu 描述" width="" />

          <el-table-column prop="prop" label="操作" width="280px">
            <template v-slot="{ row, $index }" class="bottom">
              <el-tooltip effect="light" content="添加 sku" placement="bottom">
                <el-button type="success" icon="el-icon-plus" @click="addSku(row)" />
              </el-tooltip>

              <el-tooltip effect="light" content="修改 spu" placement="bottom">
                <el-button type="warning" icon="el-icon-edit" @click="updateSpu(row)" />
              </el-tooltip>

              <el-tooltip effect="light" content="查看当前 spu 全部 sku 列表" placement="bottom">
                <el-button type="info" icon="el-icon-info" />
              </el-tooltip>

              <el-tooltip effect="light" content="删除 spu" placement="bottom">
                <el-popconfirm :title="`确定删除 ${row.spuName} 吗？`" @onConfirm="deleteSpu(row)">
                  <el-button slot="reference" type="danger" icon="el-icon-delete" style="margin-left: 10px" />
                </el-popconfirm>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :current-page="pageNum"
          :total="totalCount"
          :page-size="pageSize"
          :pager-count="7"
          :page-sizes="[3, 5, 10]"
          layout="prev, pager, next, jumper, ->, sizes, total"
          style="margin-top: 20px; text-align: center"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>

      <SpuForm v-show="scene === 1" @changeScene="changeScene" ref="spuform" />

      <SkuForm v-show="scene === 2" />
    </el-card>
  </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'

export default {
  name: 'Spu',
  components: {
    SpuForm,
    SkuForm
  },
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      pageNum: 1,
      totalCount: 0,
      pageSize: 3,
      spuList: [],
      scene: 0 // 0 代表展示 spu 列表数据，1 代表添加 SPU | 修改 SPU，2 代表添加 SKU
    }
  },
  methods: {
    async getSpuList() {
      const result = await this.$API.spu.reqSpuList(this.pageNum, this.pageSize, this.category3Id)
      this.spuList = result.data.records
      this.totalCount = result.data.total
    },
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        this.getSpuList()
      }
    },
    handleCurrentChange(currentPageNum) {
      this.pageNum = currentPageNum
      this.getSpuList()
    },
    handleSizeChange(currentPageSize) {
      this.pageSize = currentPageSize
      this.getSpuList()
    },
    addSpu() {
      this.scene = 1
      this.$refs.spuform.addSpuFormData(this.category3Id)
    },
    updateSpu(row) {
      this.scene = 1
      this.$refs.spuform.initSpuFormData(row)
    },
    changeScene({ scene, flag }) {
      this.scene = scene
      if (flag === '添加') {
        this.pageNum = 1
      }
      this.getSpuList()
    },
    async deleteSpu(row) {
      await this.$API.spu.reqDeleteSpu(row.id)
      this.$message({
        type: 'success',
        message: `删除 ${row.spuName} 成功！`
      })
      if (this.spuList.length <= 1) {
        this.pageNum -= 1
      }
      this.getSpuList()
    },
    addSku(row) {
      this.scene = 2
    }
  }
}
</script>

<style>
.bottom {
  clear: both;
  text-align: center;
}
</style>
