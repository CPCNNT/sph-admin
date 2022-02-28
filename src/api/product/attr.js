// 平台属性管理模块请求

import request from '@/utils/request'

// 获取一级分类数据接口，/admin/product/getCategory1，method: 'get'
export const reqCategory1List = () => request({
  url: '/admin/product/getCategory1',
  method: 'get'
})

// 获取二级分类数据接口，/admin/product/getCategory2/{category1Id}，method: 'get'
export const reqCategory2List = category1Id => request({
  url: `/admin/product/getCategory2/${category1Id}`,
  method: 'get'
})

// 获取三级分类数据接口，/admin/product/getCategory3/{category2Id}，method: 'get'
export const reqCategory3List = category2Id => request({
  url: `/admin/product/getCategory3/${category2Id}`,
  method: 'get'
})

// 获取平台属性接口，/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}，method: 'get'
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get'
})

// 添加属性与属性值接口，/admin/product/saveAttrInfo，传一个参数 baseAttrInfo，method: 'post'
export const reqAddOrUpdateAttr = data => request({ url: '/admin/product/saveAttrInfo', data, method: 'post' })
/*
baseAttrInfo = {
  "attrName": "string",
  "attrValueList": [
    {
      "attrId": 0,
      "id": 0,
      "valueName": "string"
    }
  ],
  "categoryId": 0,
  "categoryLevel": 0,
  "id": 0
}
*/

// 删除属性接口，/admin/product/deleteAttr/{attrId}，method: 'delete'
export const reqDeleteAttrInfo = attrId => request({ url: `/admin/product/deleteAttr/${attrId}`, method: 'delete' })
