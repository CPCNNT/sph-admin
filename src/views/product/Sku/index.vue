<template>
  <div>
    <el-table :data="skuList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="skuName" label="名称" width=""></el-table-column>
      <el-table-column prop="skuDesc" label="描述" width=""></el-table-column>
      <el-table-column prop="" label="默认图片" width="200" align="center">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px;">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(千克)" width="150"></el-table-column>
      <el-table-column prop="price" label="价格(元)" width="100"></el-table-column>
      <el-table-column prop="date" label="操作" width="280">
        <template slot-scope="{ row }">
          <el-button v-if="row.isSale === 0" type="success" icon="el-icon-top" size="medium" title="上架" @click="onSale(row)"></el-button>
          <el-button v-else icon="el-icon-bottom" size="medium" title="下架" @click="cancelSale(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="medium"></el-button>
          <el-button type="info" icon="el-icon-info" size="medium" title="查看详情" @click="getSkuInfo(row)"></el-button>
          <el-popconfirm :title="`确定删除 ${row.skuName} 吗？`" @onConfirm="deleteSku(row)">
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="medium" style="margin-left: 10px;"></el-button>
          </el-popconfirm>
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

    <el-drawer
      :title="skuInfo.skuName"
      :visible.sync="drawer"
      :with-header="false"
      size="50%"
      :show-close="false"
      @close="closeDrawer"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }} 元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="item in skuInfo.skuAttrValueList"
            :key="item.id"
            style="margin: 0 8px 8px 0"
          >{{ item.attrId }}-{{ item.valueId }}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="460px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" alt="">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      pageNum: 1,
      totalCount: 0,
      pageSize: 3,
      skuList: [],
      skuInfo: {},
      drawer: false
    }
  },
  methods: {
    async getSkuList() {
      const res = await this.$API.sku.reqSkuList(this.pageNum, this.pageSize)
      this.skuList = res.data.records
      this.totalCount = res.data.total
    },
    handleCurrentChange(currentPageNum) {
      this.pageNum = currentPageNum
      this.getSkuList()
    },
    handleSizeChange(currentPageSize) {
      this.pageSize = currentPageSize
      this.getSkuList()
    },
    async onSale(sku) {
      await this.$API.sku.reqOnSale(sku.id)
      this.$message({ type: 'success', message: `上架 ${sku.skuName} 成功！` })
      this.getSkuList()
    },
    async cancelSale(sku) {
      await this.$API.sku.reqCancelSale(sku.id)
      this.$message({ type: 'success', message: `下架 ${sku.skuName} 成功！` })
      this.getSkuList()
    },
    async deleteSku(sku) {
      await this.$API.sku.reqDeleteSku(sku.id)
      this.$message({ type: 'success', message: `删除 ${sku.skuName} 成功！` })
      this.getSkuList()
    },
    async getSkuInfo(sku) {
      this.drawer = true
      const res = await this.$API.sku.reqSkuInfo(sku.id)
      this.skuInfo = res.data
    },
    closeDrawer() {
      this.skuInfo = {}
    }
  },
  mounted() {
    this.getSkuList()
  }
}
</script>

<style scoped>
.el-col-5 {
  font-size: 1.4em;
  font-weight: bold;
  text-align: right;
}

.el-col-16 {
  font-size: 1.2em;
}

.el-col {
  margin: 20px 20px;
}

.el-carousel {
  border: solid lightgray;
  width: 400px;
  /* height: 460px; */
}

.el-carousel__item img {
  text-align: center;
  width: 400px;
  height: 400px;
}

/* css 中 >>> 代表深度选择器，可以使父组件中的样式即使在 scoped 下仍能够影响到子组件 */
>>>.el-carousel__button { 
  width: 10px;
  height: 10px;
  background: #409EFF;
  border-radius: 50%;
}
</style>
