<template>
    <div id="cart">
        <ul>
            <li v-for="(prod,index) in cartArr" :key="index">
                <span>{{prod.label}}</span>
                <i class="cubeic-remove" @click="cartReduce(prod)"></i>
                <input type="text" v-model="prod.count">
                <i class="cubeic-add" @click="cartAdd(prod)"></i>
            </li>
        </ul>
        <cube-button>下单</cube-button>
        <cube-button class="clearBut" @click="clearCart">清空购物车</cube-button>
    </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex';
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            cartArr: state => state.cartArr
        })
    },
    methods: {
        cartAdd(prod) {
            this.$store.dispatch('addToCart', prod.label);
        },
        cartReduce(prod) {
            this.$store.dispatch('reduceToCart', prod.label);

        },
        clearCart() {
            this.cartArr = [];
        }
    }
}
</script>
<style lang="stylus" scoped>
#cart {
    li {
        margin 10px 0
        span {
            margin-right 30px
        }
        input {
            width 50px
            text-align center
        }
    }
    .clearBut {
        margin-top 10px
    }
}
</style>