import request from '@/utils/request'

// 获取 spu 列表数据接口，/admin/product/{page}/{limit}，method: 'get'，需要三个参数：page、limit、category3Id
export const reqSpuList = (page, limit, category3Id) => request({
  url: `/admin/product/${page}/${limit}`,
  params: { category3Id },
  method: 'get'
})

// 获取 spu 基本信息，/admin/product/getSpuById/{spuId}，method: 'get'
export const reqSpuInfo = spuId => request({
  url: `/admin/product/getSpuById/${spuId}`,
  method: 'get'
})

// 获取品牌信息，/admin/product/baseTrademark/getTrademarkList，method: 'get'
export const reqTradeMarkList = () => request({
  url: '/admin/product/baseTrademark/getTrademarkList',
  method: 'get'
})

// 获取 spu 图片信息，/admin/product/spuImageList/{spuId}，method: 'get'
export const reqSpuImageList = spuId => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'get'
})

// 获取平台全部销售属性，整个平台销售属性一共三个，/admin/product/baseSaleAttrList，method: 'get'
export const reqBaseSaleAttrList = () => request({
  url: '/admin/product/baseSaleAttrList',
  method: 'get'
})

// 修改 spu，/admin/product/updateSpuInfo，method: 'post'
export const reqUpdateSpuInfo = spuInfo => request({
  url: '/admin/product/updateSpuInfo',
  data: spuInfo,
  method: 'post'
})

// 添加 spu，/admin/product/saveSpuInfo，method: 'post'
export const reqAddSpuInfo = spuInfo => request({
  url: '/admin/product/saveSpuInfo',
  data: spuInfo,
  method: 'post'
})

// 删除 spu，/admin/product/deleteSpu/{spuId}，method: 'delete'
export const reqDeleteSpu = spuId => request({
  url: `/admin/product/deleteSpu/${spuId}`,
  method: 'delete'
})

// 获取 skuForm 信息
export const reqSpuSaleAttrList = spuId => request({
  url: `/admin/product/spuSaleAttrList/${spuId}`,
  method: 'get'
})

export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get'
})

// 添加 sku
export const reqAddSku = skuInfo => request({
  url: '/admin/product/saveSkuInfo',
  data: skuInfo,
  method: 'post'
})

// 获取 sku 列表数据
export const reqSkuList = spuId => request({
  url: `/admin/product/findBySpuId/${spuId}`,
  method: 'get'
})
