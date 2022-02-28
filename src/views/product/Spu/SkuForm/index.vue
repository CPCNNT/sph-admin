<template>
  <div>
    <el-form :model="form" label-width="100px">
      <el-form-item label="SPU 名称">
        海绵宝宝
      </el-form-item>

      <el-form-item label="SKU 名称">
        <el-input placeholder="请输入 SKU 名称" />
      </el-form-item>

      <el-form-item label="价格(元)">
        <el-input placeholder="请输入价格(元)" />
      </el-form-item>

      <el-form-item label="重量(千克)">
        <el-input placeholder="请输入重量(千克)" />
      </el-form-item>

      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" placeholder="请输入规格描述" />
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="100px">
          <el-form-item label="屏幕尺寸">
            <el-select placeholder="请选择" value="">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="无线通信">
            <el-select placeholder="请选择" value="">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="100px">
          <el-form-item label="颜色">
            <el-select placeholder="请选择" value="">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table style="width: 100%" border>
          <el-table-column type="selection" width="60" />
          <el-table-column prop="prop" label="图片" width="" />
          <el-table-column prop="prop" label="名称" width="" />
          <el-table-column prop="prop" label="操作" width="" />
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      form: {}
    }
  }
}
</script>
