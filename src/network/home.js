/*
负责home页面的网络请求 
 */

import {request} from "./request"

export function getHomeMultidata() {    //轮播图与推荐图
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type,page) {    //商品数据
     return request({
         url:'/home/data',
         params:{
             type,  //type:type
             page,  //page:page
         }
     })
}