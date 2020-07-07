/*
这里负责封装网络请求
封装axios
*/
import axios from 'axios'


//4.create自带Promise
export function request(config) {

    //1.创建axios实例
    const instance = axios.create({//create的实例返回值就是一个Promise
        baseURL: '该地址为数据请求地址',    //需要此地址请加我的VX 15846561746
        timeout: 5000,
    })

    //2.axios的拦截器
    // axios.interceptors//这样是拦截全局

    //2.1请求拦截
    //拦截实例请求,use中有两个函数参数
    instance.interceptors.request.use(config => {//第一个参数是成功
        // console.log(config);
        return config //这里拦截到,处理完一定要把数据再返回出去，不然请求数据的页面请求不到
    }, err => {//第一个是失败
        console.log(err);

    })

    //2.1响应拦截

    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data
    }, err => {
        console.log(err);
    })

    //3.发送真正的网络请求
    return instance(config)//把config给instance实例让他们连接
    //因为create的返回值就是一个Promise,所以他的实例instance也就是一个Promise

}






