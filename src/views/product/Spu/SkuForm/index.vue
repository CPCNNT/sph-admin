<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SPU 名称">{{ spu.spuName }}</el-form-item>

      <el-form-item label="SKU 名称">
        <el-input placeholder="请输入 SKU 名称" v-model="skuInfo.skuName" />
      </el-form-item>

      <el-form-item label="价格(元)">
        <el-input placeholder="请输入价格(元)" type="number" v-model="skuInfo.price" />
      </el-form-item>

      <el-form-item label="重量(千克)">
        <el-input placeholder="请输入重量(千克)" v-model="skuInfo.weight" />
      </el-form-item>

      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" placeholder="请输入规格描述" v-model="skuInfo.skuDesc" />
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="100px" size="medium" style="border: dotted #dcdfe6; border-radius: 4px; padding: 8px 0 4px">
          <el-form-item v-for="attr in attrInfoList" :key="attr.id" :label="attr.attrName">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attr.id},${attrValue.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="100px" size="medium" style="border: dotted #dcdfe6; border-radius: 4px; padding: 8px 0 4px">
          <el-form-item v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id" :label="saleAttr.saleAttrName">
            <el-select placeholder="请选择" v-model="saleAttr.saleAttrIdAndValueId">
              <el-option
                v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id},${saleAttrValue.id}`"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table ref="multipleTable" :data="spuImageList" style="width: 100%" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="60" :selectable="row => row.isDefault === 1 ? false : true" />

          <el-table-column prop="prop" label="图片" width="">
            <template slot-scope="{ row }">
              <img :src="row.imgUrl" :alt="row.imgName" style="width: 100px; height: 100px">
            </template>
          </el-table-column>

          <el-table-column prop="imgName" label="名称" width="" />

          <el-table-column prop="prop" label="操作" width="">
            <template slot-scope="{ row }">
              <el-button type="primary" v-if="row.isDefault === 0" @click="setDefault(row)">设为默认</el-button>
              <template v-else>
                <el-button type="success" disabled>默认</el-button>
                <el-button @click="cancelDefault(row)">取消</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      spuImageList: [],
      attrInfoList: [],
      spuSaleAttrList: [],
      spu: {},
      imgList: [], // 收集图片数据，目前缺少 isDefault，提交给服务器前需整理参数
      skuInfo: {
        // 第一类收集的数据，父组件给的数据
        "category3Id": 0,
        "spuId": 0,
        "tmId": 0,
        // 第二类，需通过数据双向绑定 v-model 收集的数据
        "skuName": "",
        "price": 0,
        "weight": "",
        "skuDesc": "",
        // 第三类，需要自己书写代码去收集
        "skuAttrValueList": [
          /* {
            "attrId": 0,
            "attrName": "string",
            "id": 0,
            "skuId": 0,
            "valueId": 0,
            "valueName": "string"
          } */
        ],
        "skuSaleAttrValueList": [
          /* {
            "id": 0,
            "saleAttrId": 0,
            "saleAttrName": "string",
            "saleAttrValueId": 0,
            "saleAttrValueName": "string",
            "skuId": 0,
            "spuId": 0
          } */
        ],
        "skuImageList": [
          /* {
            "id": 0,
            "imgName": "string",
            "imgUrl": "string",
            "isDefault": "string",
            "skuId": 0,
            "spuImgId": 0
          } */
        ],
        "skuDefaultImg": ""
      }
    }
  },
  methods: {
    async getSkuFormData(category1Id, category2Id, spu) {
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu = spu

      const resSpuImageList = await this.$API.spu.reqSpuImageList(spu.id)
      let temp = resSpuImageList.data
      temp.forEach(item => {
        item.isDefault = 0
      })
      this.spuImageList = temp

      const resSpuSaleAttrList = await this.$API.spu.reqSpuSaleAttrList(spu.id)
      this.spuSaleAttrList = resSpuSaleAttrList.data

      const resAttrInfoList = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
      this.attrInfoList = resAttrInfoList.data
    },
    handleSelectionChange(val) {
      this.imgList = val
    },
    setDefault(row) {
      // toggleRowSelection | 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） |	row, selected
      this.$refs.multipleTable.toggleRowSelection(row, true)
      this.spuImageList.forEach(item => {
        item.isDefault = 0
        row.isDefault = 1
        this.skuInfo.skuDefaultImg = row.imgUrl
      })
    },
    cancelDefault(row) {
      row.isDefault = 0
      this.skuInfo.skuDefaultImg = ''
    },
    cancel() {
      this.$emit('changeSceneSkuForm', 0)
      Object.assign(this._data, this.$options.data()) // 清除残留的数据
    },
    async save() {
      // 整理提交给服务器的参数
      const { attrInfoList, spuSaleAttrList, imgList, skuInfo } = this

      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(',')
          prev.push({ attrId, valueId })
        }
        return prev
      }, [])

      skuInfo.skuSaleAttrValueList = spuSaleAttrList.map(item => {
        if (item.saleAttrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.saleAttrIdAndValueId.split(',')
          return { saleAttrId, saleAttrValueId }
        }
      })

      skuInfo.skuImageList = imgList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })

      await this.$API.spu.reqAddSku(skuInfo)
      this.$message({ type: 'success', message: '添加 sku 成功！' })
      this.$emit('changeSceneSkuForm', 0)
    }
  }
}
</script>
