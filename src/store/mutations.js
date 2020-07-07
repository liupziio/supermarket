export default {
     //mutations唯一的目的就是修改status中的状态
        //mutations中的每个方法尽可能完成的事件比较单一一点
        addCounter(state,payload) {
            payload.count++
        },
        addToCart(state,payload) {
            payload.checked = true //存储商品选中状态
            state.cartList.push(payload)
        }
    
}