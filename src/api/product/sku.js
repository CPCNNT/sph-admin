import request from '@/utils/request'

// 获取 sku 列表数据
export const reqSkuList = (page, limit) => request({
  url: `/admin/product/list/${page}/${limit}`,
  method: 'get'
})

// 上架 sku
export const reqOnSale = skuId => request({
  url: `/admin/product/onSale/${skuId}`,
  method: 'get'
})

// 下架 sku
export const reqCancelSale = skuId => request({
  url: `/admin/product/cancelSale/${skuId}`,
  method: 'get'
})

// 删除 sku
export const reqDeleteSku = skuId => request({
  url: `/admin/product/deleteSku/${skuId}`,
  method: 'delete'
})

// 获取 sku 详情
export const reqSkuInfo = skuId => request({
  url: `/admin/product/getSkuById/${skuId}`,
  method: 'get'
})
