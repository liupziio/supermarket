import { request } from "./request";

//根据iid请求数据
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })

}

//请求推荐数据
export function getRecommend() {
    return request({
      url: '/recommend'
    })
  }

//把详情页请求的商品基本信息放在一个 Goods 对象中
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}


//把详情页请求的店铺信息放在一个 Shop 对象中
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}  

//把商品参数信息 GoodsParam 对象中
export class GoodsParam {
    constructor(info, rule) {
      // 注: images可能没有值(某些商品有值, 某些没有值)
      this.image = info.images ? info.images[0] : '';
      this.infos = info.set;
      this.sizes = rule.tables;
    }
  }