<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select v-model="formInline.category1Id" placeholder="请选择" :disabled="isShow" @change="handler1">
          <el-option v-for="c1 in category1List" :key="c1.id" :label="c1.name" :value="c1.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="formInline.category2Id" placeholder="请选择" :disabled="isShow" @change="handler2">
          <el-option v-for="c2 in category2List" :key="c2.id" :label="c2.name" :value="c2.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="formInline.category3Id" placeholder="请选择" :disabled="isShow" @change="handler3">
          <el-option v-for="c3 in category3List" :key="c3.id" :label="c3.name" :value="c3.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: ['isShow'],
  data() {
    return {
      category1List: [],
      category2List: [],
      category3List: [],
      formInline: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  mounted() {
    this.getCategory1List()
  },
  methods: {
    async getCategory1List() {
      try {
        const result = await this.$API.attr.reqCategory1List()
        this.category1List = result.data
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    async handler1() {
      this.category2List = []
      this.category3List = []
      this.formInline.category2Id = ''
      this.formInline.category3Id = ''

      const { category1Id } = this.formInline
      this.$emit('getCategoryId', { categoryId: category1Id, level: 1 })

      try {
        const result = await this.$API.attr.reqCategory2List(category1Id)
        this.category2List = result.data
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    async handler2() {
      this.category3List = []
      this.formInline.category3Id = ''

      const { category2Id } = this.formInline
      this.$emit('getCategoryId', { categoryId: category2Id, level: 2 })

      try {
        const result = await this.$API.attr.reqCategory3List(category2Id)
        this.category3List = result.data
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    handler3() {
      const { category3Id } = this.formInline
      this.$emit('getCategoryId', { categoryId: category3Id, level: 3 })
    }
  }
}
</script>
