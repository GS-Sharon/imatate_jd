<template>
  <div id="Nav">
		<transition name='fade-slide-right'>
			<router-view class="Router"></router-view>
		</transition>
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      @change="changeHandler"
      class="tabBox"
    ></cube-tab-bar>
		<span class="cartTotal">{{cartNums}}</span>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  data() {
    return {
      selectedLabelDefault: "首页",
      tabs: [
        {
					name: 'Index',
          label: "首页",
          icon: "cubeic-home"
        },
        {
					name: 'List',
          label: "分类",
          icon: "cubeic-tag"
				},
				{
					name: 'Search',
          label: "搜索",
          icon: "cubeic-search"
        },
        {
					name: 'Cart',
          label: "购物车",
          icon: "cubeic-mall"
        },
        {
					name: 'Mine',
          label: "我的",
          icon: "cubeic-person"
        }
      ]
    };
	},
	computed: {
		...mapGetters({
			cartNums: 'cartNums'
		})
	},
	methods: {
		changeHandler(label) {
			this.tabs.forEach(tab => {
				if(tab.label == label) {
					this.$router.push({name:tab.name});
				}
			})
		}
	}
};
</script>
<style lang="stylus" scoped>
#Nav {
	position relative
	width 100vw
	height 100vh
	overflow hidden
	.tabBox {
		width: 100%;
		height: 50px
		position: fixed;
		bottom: 0;
		background-color #fff
		z-index 1000
		.cube-tab {
			font-size 16px
			padding-top 3px
			i {
				font-size 20px
			}
		}
	}
	// opacity 0-1的过程 和 opacity 1-0的过程
	.fade-slide-right-enter-active,
	.fade-slide-right-leave-active  {
		transition: all 0.8s ease
	}
	// 出现前
	.fade-slide-right-enter {
		transform translateX(100%)
		opacity 0
	}
	// 出现时
	.fade-slide-right-leave {
		transform translateX(0)
		opacity 1
	}
	.cartTotal {
		position absolute	
		right 23.5%
		bottom 33px
		z-index 1001
		border-radius 100%
		width 20px
		height 20px
		display block
		background-color red
		color #fff
		font-size 12px
		line-height 20px
		text-align center
		font-family '微软雅黑'
	}
}
</style>
<style lang="stylus">
#Nav {
	.tabBox {
		.cube-tab {
			font-size 14px
			padding-top 3px
			i {
				font-size 20px
			}
		}
	}
	
}
</style>