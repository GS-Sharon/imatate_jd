<template>
    <div>
        <div id="mine">
            <ul>
                <li v-for="item in mineList" :key='item.label' @click="clickItem(item)">
                    {{item.label}}
                    <span class="cubeic-arrow"></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            mineList: [
                {label: '商品收藏'},
                {label: '我的足迹'},
                {label: '店铺收藏'},
                {label: '我的订单'},
                {label: '退出', type: 'exit'},
            ]
        }
    },
    methods: {
        clickItem(item) {
            if(item.type == 'exit') {
                //清除vuex的token
                this.$store.dispatch('setToken','');
                // 清除浏览器缓存
                window.localStorage.removeItem('token');
                // 跳转至登陆页面
                this.$router.replace({path: '/login'});
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
#mine {
    li {
        border-bottom 1px solid #cccccc
        line-height 80px
        font-size 16px
        text-align left 
        padding 0 30px
        span {
            float right
        }
    }
}
</style>