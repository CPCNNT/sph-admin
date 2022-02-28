<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0" @click="addTradeMark">添加</el-button>

    <!-- 表格组件
      data 表格组件将来要展示的数据（数组类型）
      border 表格边框
      label 显示的标题
      width 列的宽度
      align 标题对齐的方式
      type	对应列的类型。如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮
      prop	对应列内容的字段名，也可以使用 property 属性 -->
    <el-table :data="list" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80px" align="center" />
      <el-table-column prop="tmName" label="品牌名称" width="width" />
      <el-table-column prop="prop" label="品牌LOGO" width="width">
        <template v-slot="{ row }">
          <img :src="row.logoUrl" alt="" style="height: 100px; width: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template v-slot="{ row }">
          <el-button type="warning" icon="el-icon-edit" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器
      当前第几页、数据总条数、每一页展示的条数、连续页码数
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"

      current-page	当前页数，支持 .sync 修饰符
      total	总条目数
      page-size	每页显示条目个数，支持 .sync 修饰符
      pager-count	页码按钮的数量，当总页数超过该值时会折叠
      page-sizes	每页显示个数选择器的选项设置
      layout	组件布局，子组件名用逗号分隔	String	sizes, prev, pager, next, jumper, ->, total, slot
      background	是否为分页按钮添加背景色
    -->
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

    <!-- 对话框
      Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，
      并将 Form-Item 的 prop 属性设置为需校验的字段名即可。
    -->
    <el-dialog :title="tmForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :model="tmForm" :rules="rules">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off" style="width: 80%" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    const validateTmName = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error('长度在 2 到 10 个字符'))
      } else {
        callback()
      }
    }
    return {
      pageNum: 1,
      totalCount: 0,
      pageSize: 3,
      list: [],
      dialogFormVisible: false,
      tmForm: {
        tmName: '',
        logoUrl: ''
      },
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          // { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
          { validator: validateTmName, trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择品牌图片' }
        ]
      }
    }
  },
  mounted() {
    this.getPageList()
  },
  methods: {
    async getPageList() {
      const { pageNum, pageSize } = this
      const result = await this.$API.tradeMark.reqTradeMarkList(pageNum, pageSize)
      if (result.code === 200) {
        this.totalCount = result.data.total
        this.list = result.data.records
      }
    },
    handleCurrentChange(currentPageNum) {
      this.pageNum = currentPageNum
      this.getPageList()
    },
    handleSizeChange(currentPageSize) {
      this.pageSize = currentPageSize
      this.getPageList()
    },
    addTradeMark() {
      this.tmForm = {
        tmName: '',
        logoUrl: ''
      }
      this.dialogFormVisible = true
    },
    updateTradeMark(row) {
      this.tmForm = { ...row } // 浅拷贝
      this.dialogFormVisible = true
    },
    deleteTradeMark(row) {
      this.$confirm(`你确定删除 ${row.tmName} 吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const result = await this.$API.tradeMark.reqDeleteTradeMark(row.id)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.getPageList()
        }
      }).catch(params => {
        if (params === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    addOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.dialogFormVisible = false
          const result = await this.$API.tradeMark.reqAddOrUpdateTradeMark(this.tmForm)
          if (result.code === 200) {
            this.$message({
              message: this.tmForm.id ? '修改品牌成功！' : '添加品牌成功！',
              type: 'success'
            })
            this.getPageList()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
