// 获取品牌管理数据

import request from '@/utils/request'

// 接口地址 /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

// 添加品牌，/admin/product/baseTrademark/save，method: 'post'，携带两个参数：品牌名称、品牌LOGO
// 修改品牌，/admin/product/baseTrademark/update，method: 'put'，携带三个参数：品牌id、品牌名称、品牌LOGO
export const reqAddOrUpdateTradeMark = tradeMark => {
  if (tradeMark.id) {
    return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark })
  } else {
    return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark })
  }
}
