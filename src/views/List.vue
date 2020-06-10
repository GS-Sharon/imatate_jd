<template>
    <div id="list">
        <cube-scroll class="leftPanel">
            <ul>
                <li v-for="(tab,tabIndex) in tabs" :key="tabIndex" :class="tab.active? 'active': ''" @click="switchTab(tabIndex)">
                    {{tab.label}}
                </li>
            </ul>
        </cube-scroll>
        <cube-scroll class="rightPanel">
            <ul>
                <li v-for="(item,index) in classify" :key="index">
                    <img :src="item.image">
                    <p>{{item.label}}<i class="cubeic-add" @click="addToCart($event,item.label)"></i></p>
                </li>
            </ul>
        </cube-scroll>
        <transition 
		@before-enter="beforeEnter"
		@enter="enter"
		@afterEnter="afterEnter">
			<div class="ballBox" v-if='ifShow'>
				<div class="innerBall">
					<span class="cubeic-add"></span>
				</div>
			</div>
		</transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tabs: [],
            classify: [],
            addEle: null,
            ifShow: false
        }
    },
    created() {
        this.getKinds();
        this.getClassfy(0);
    },
    methods: {
        async getKinds() {
            let result = (await this.$http.get('/api/getKinds')).data;
            this.tabs = result.map(tab => {
                return {
                    label: tab,
                    active: false
                }
            })
            this.tabs[0].active = true;
        },
        async getClassfy(idx) {
            this.classify = (await this.$http.get('/api/getKindClassify',{params: {index:idx}}));
        },
        // 类目切换
        switchTab(idx) {
            this.tabs.forEach((tab,index) => {
                if(idx == index) {
                    tab.active = true;
                } else {
                    tab.active = false;
                }
            })
            this.getClassfy(idx);
        },
        // 添加购物车
        addToCart($event,label) {
            this.$store.dispatch('addToCart', label);
            this.addEle = $event.target;
            this.ifShow = true;
        },
		beforeEnter(el) {
            let rightPanel = document.querySelector('.rightPanel');
            let innerBall = el.querySelector('.innerBall');
            let rect = this.addEle.getBoundingClientRect();
            let x = rect.left + 10 - window.innerWidth * 0.72;
            let y = rect.top - window.innerHeight + 40;
            el.style.transform = `translate3d(0,${y}px,0)`;
            innerBall.style.transform = `translate3d(${x}px,0,0)`

        },
		enter(el,done) {
            el.offsetWidth;
            let innerBall = el.querySelector('.innerBall');
            el.style.transform = `translate3d(0,0,0)`;
            innerBall.style.transform = `translate3d(0,0,0)`;
            done();
        },
		afterEnter() {
            this.ifShow = false;
        }
    },
    mounted() {
        let leftPanel = document.querySelector('.leftPanel');
        let rightPanel = document.querySelector('.rightPanel');
        leftPanel.style.height = document.documentElement.clientHeight - 50 + 'px';
        rightPanel.style.height = document.documentElement.clientHeight - 50 + 'px';
    }
}
</script>
<style lang="stylus" scoped>
#list {
    display flex
    .cube-scroll-wrapper.leftPanel {
        flex 4
        display flex
        flex-wrap wrap
        background-color #ccc
        li {
            align-content center
            justify-content center
            font-size 14px
            line-height 80px
            &.active {
                background-color #fff
            }
        }
    }
    .rightPanel {
        flex 8
        display flex
        flex-wrap wrap
        padding 0 15px
        li {
            justify-content center
            align-content center
            width 70px
            float left
            margin-top 30px
            img {
                width 100%
            }
            p {
                font-size 14px
            }
        }
    }
    // 小球动画
    .ballBox {
        width 100%
        position absolute
        bottom 87px
        z-index 1005
        transition all 1s cubic-bezier(.49, -.29, .75, .41)
        .innerBall {
            position absolute
            top 20px
            right 28%
            display block
            width 24px
            height 24px
            transition all 1s linear
            span {
                color red
            }
        }
    }
    
}

</style>
<style lang="stylus">
#list {
    .cube-scroll-content {
        width 100%
    }
}
</style>