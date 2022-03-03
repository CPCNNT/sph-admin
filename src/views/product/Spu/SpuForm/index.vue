<template>
  <div>
    <el-form label-width="80px" :model="spuInfo">
      <el-form-item label="SPU 名称">
        <el-input v-model.trim="spuInfo.spuName" placeholder="请输入 SPU 名称" />
      </el-form-item>

      <el-form-item label="品牌">
        <el-select v-model="spuInfo.tmId" placeholder="请选择品牌">
          <el-option v-for="tm in tradeMarkList" :key="tm.id" :label="tm.tmName" :value="tm.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="SPU 描述">
        <el-input v-model.trim="spuInfo.description" type="textarea" rows="4" placeholder="请输入 SPU 描述" />
      </el-form-item>

      <el-form-item label="SPU 图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select v-model="saleAttr" :placeholder="`还有 ${unSelectedSaleAttr.length} 未选择`">
          <el-option
            v-for="item in unSelectedSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="`${item.id},${item.name}`"
          />
        </el-select>

        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-left: 15px"
          :disabled="!saleAttr"
          @click="addSaleAttr"
        >添加销售属性</el-button>

        <el-table :data="spuInfo.spuSaleAttrList" style="width: 100%; margin-top: 22px" border>
          <el-table-column type="index" label="序号" width="80px" align="center" />

          <el-table-column prop="saleAttrName" label="属性名" width="100px" />

          <el-table-column prop="prop" label="属性值名称列表" width="">
            <template v-slot="{row, $index}">
              <el-tag
                v-for="(tag, index) in row.spuSaleAttrValueList"
                :key="tag.id"
                closable
                :disable-transitions="false"
                @close="handleClose(row, index)"
              >{{ tag.saleAttrValueName }}</el-tag>
              <el-input
                v-if="row.inputVisible"
                :ref="$index"
                v-model.trim="row.inputValue"
                class="input-new-tag"
                size="small"
                @blur="handleInputConfirm(row)"
              />
              <el-button v-else class="button-new-tag" size="small" icon="el-icon-plus" @click="showInput(row, $index)">
                添加
              </el-button>
            </template>
          </el-table-column>

          <el-table-column prop="prop" label="操作" width="100px">
            <template v-slot="{$index}">
              <el-button type="danger" icon="el-icon-delete" @click="deleteSaleAttr($index)" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpuInfo">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      spuInfo: {
        category3Id: 0,
        description: '',
        spuImageList: [],
        spuName: '',
        spuSaleAttrList: [],
        tmId: ''
      },
      tradeMarkList: [],
      spuImageList: [],
      baseAttrList: [],
      saleAttr: ''
    }
  },
  computed: {
    unSelectedSaleAttr() {
      return this.baseAttrList.filter(item => {
        return this.spuInfo.spuSaleAttrList.every(item1 => {
          return item.name !== item1.saleAttrName
        })
      })
    }
  },
  methods: {
    async initSpuFormData(spu) {
      const resSpuInfo = await this.$API.spu.reqSpuInfo(spu.id)
      this.spuInfo = resSpuInfo.data

      const resTradeMarkList = await this.$API.spu.reqTradeMarkList()
      this.tradeMarkList = resTradeMarkList.data

      const resSpuImageList = await this.$API.spu.reqSpuImageList(spu.id)
      const temp = resSpuImageList.data
      temp.forEach(item => {
        item.name = item.imgName
        item.url = item.imgUrl
      })
      this.spuImageList = temp

      const resBaseSaleAttrList = await this.$API.spu.reqBaseSaleAttrList()
      this.baseAttrList = resBaseSaleAttrList.data
    },
    async addSpuFormData(category3Id) {
      this.spuInfo.category3Id = category3Id

      const resTradeMarkList = await this.$API.spu.reqTradeMarkList()
      this.tradeMarkList = resTradeMarkList.data

      const resBaseSaleAttrList = await this.$API.spu.reqBaseSaleAttrList()
      this.baseAttrList = resBaseSaleAttrList.data
    },
    handleRemove(file, fileList) {
      this.spuImageList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(response, file, fileList) {
      this.spuImageList = fileList
    },
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.saleAttr.split(',')
      const newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      }
      this.spuInfo.spuSaleAttrList.push(newSaleAttr)
      this.saleAttr = ''
    },
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1)
    },
    showInput(row, index) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    handleInputConfirm(row) {
      let { inputValue } = row
      const { baseSaleAttrId } = row
      if (inputValue.trim() === '') {
        this.$message({ type: 'warning', message: '属性值不能为空！' })
        return
      }
      if (!row.spuSaleAttrValueList.every(item => inputValue.trim() !== item.saleAttrValueName)) {
        this.$message({ type: 'warning', message: '当前属性值已存在！' })
        return
      }
      const newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue
      }
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false
      inputValue = ''
    },
    deleteSaleAttr(index) {
      this.spuInfo.spuSaleAttrList.splice(index, 1)
    },
    async addOrUpdateSpuInfo() {
      this.spuInfo.spuImageList = this.spuImageList.map(item => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url
        }
      })
      if (this.spuInfo.id) {
        await this.$API.spu.reqUpdateSpuInfo(this.spuInfo)
      } else {
        await this.$API.spu.reqAddSpuInfo(this.spuInfo)
      }
      this.$message({ type: 'success', message: '修改 spu 成功！' })
      this.$emit('changeSceneSpuForm', { scene: 0, flag: this.spuInfo.id ? '修改' : '添加' })
      Object.assign(this._data, this.$options.data()) // 清除残留数据
    },
    cancel() {
      this.$emit('changeSceneSpuForm', { scene: 0, flag: '' })
      Object.assign(this._data, this.$options.data()) // 清除残留数据
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
