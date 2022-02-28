<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect :is-show="!isShowTable" @getCategoryId="getCategoryId" />
    </el-card>

    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addAttr">添加属性</el-button>

        <el-table :data="attrInfoList" style="width: 100%; margin-top: 20px" border>
          <el-table-column type="index" label="序号" width="80px" align="center" />

          <el-table-column property="attrName" label="属性名称" width="150px" />

          <el-table-column property="attrValueList" label="属性值列表" width="">
            <template slot-scope="{ row }">
              <el-tag v-for="item in row.attrValueList" :key="item.id" type="success" style="margin: 4px 8px" effect="light">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column property="date" label="操作" width="200px">
            <template slot-scope="{ row }">
              <el-button type="warning" icon="el-icon-edit" @click="updateAttr(row)" />
              <el-popconfirm :title="`确定删除 ${row.attrName} 吗？`" @onConfirm="deleteAttrInfo(row)">
                <el-button slot="reference" type="danger" icon="el-icon-delete" style="margin-left: 10px" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-show="!isShowTable">
        <el-form ref="form" :inline="true" :model="attrInfo" label-width="80px" label-position="left">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" />
          </el-form-item>
        </el-form>

        <el-button type="primary" icon="el-icon-plus" :disabled="!attrInfo.attrName" @click="addAttrValue">添加属性值</el-button>

        <el-table border style="width: 100%; margin: 20px 0" :data="attrInfo.attrValueList">
          <el-table-column type="index" label="序号" width="80px" align="center" />

          <el-table-column property="prop" label="属性值名称" width="">
            <template v-slot="{ row, $index }">
              <el-input
                v-if="row.flag"
                :ref="$index"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
              />
              <span v-else style="display: block" @click="toEdit(row, $index)">{{ row.valueName }}</span>
            </template>
          </el-table-column>

          <el-table-column property="prop" label="操作" width="">
            <template v-slot="{ row, $index }">
              <el-popconfirm :title="`确定删除 ${row.valueName} 吗？`" @onConfirm="deleteAttrValue($index)">
                <el-button slot="reference" type="danger" icon="el-icon-delete" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" :disabled="attrInfo.attrValueList.length < 1" @click="addOrUpdateAttr">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'Attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrInfoList: [],
      isShowTable: true,
      attrInfo: {
        'attrName': '',
        'attrValueList': [],
        'categoryId': 0,
        'categoryLevel': 3
      }
    }
  },
  methods: {
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
        this.getAttrInfoList()
      }
    },
    async getAttrInfoList() {
      const { category1Id, category2Id, category3Id } = this
      const result = await this.$API.attr.reqAttrInfoList(category1Id, category2Id, category3Id)
      if (result.code === 200) {
        this.attrInfoList = result.data
        return result.message
      } else {
        return Promise(new Error(result.message))
      }
    },
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        flag: true
      })
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    addAttr() {
      this.attrInfo = {
        'attrName': '',
        'attrValueList': [],
        'categoryId': this.category3Id,
        'categoryLevel': 3
      }
      this.isShowTable = false
    },
    updateAttr(row) {
      this.attrInfo = cloneDeep(row) // 由于有嵌套结构，需用深拷贝
      this.attrInfo.attrValueList.forEach(item => {
        this.$set(item, 'flag', false)
      })
      this.isShowTable = false
    },
    toLook(row) {
      if (row.valueName.trim() === '') {
        this.$message({
          message: '当前属性值不能为空！',
          type: 'warning'
        })
        return
      }
      const isDuplicate = this.attrInfo.attrValueList.some(item => {
        if (row !== item) {
          return row.valueName === item.valueName
        }
      })
      if (isDuplicate) {
        this.$message({
          message: '当前的属性值已存在！',
          type: 'warning'
        })
        return
      }
      row.flag = false
    },
    toEdit(row, index) {
      row.flag = true
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1)
    },
    async deleteAttrInfo(row) {
      try {
        await this.$API.attr.reqDeleteAttrInfo(row.id)
        this.$message({ type: 'success', message: '删除成功!' })
        this.getAttrInfoList()
      } catch (error) {

      }
    },
    async addOrUpdateAttr() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if (item.valueName !== '') {
          delete item.flag
          return true
        }
      })
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.$message({ type: 'success', message: '保存成功！' })
        this.getAttrInfoList()
      } catch (error) {

      }
      this.isShowTable = true
    }
  }
}
</script>
