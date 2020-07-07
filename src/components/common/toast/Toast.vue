<template>
<div class="toast" v-show="isShow">
    <div>
        {{message}}
    </div>
</div>
  
</template>

<script>
export default {   
    name: 'Toast',
    props:{
        // message:{
        //     type:String,
        //     default:''
        // },
        // show:{
        //     type: Boolean,
        //     default: false
        // }
    },
    data() {
        return {
            message: '',
            isShow: false
        }
    },
    methods: {
        show(message = '默认文字',duration = 1000) {//这里给的是默认

            // duration = duration || 1000

            // console.log('aaa');
            // console.log(this.isShow)
            this.isShow = true
            this.message = message

            setTimeout(() => {
                this.isShow = false
                this.message = ''
            },duration)
        }
    },



}
</script>

<style scoped>
.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);/* 居中 */
    padding: 8px 10px;

    color: #fff;
    background-color: rgba(0,0,0,.7);

    z-index: 999;
}

</style>