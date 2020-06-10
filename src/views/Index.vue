<template>
  <!-- 首页 -->
  <div id="Index">
    <!-- 轮播图 -->
    <cube-slide ref="slide" :data="items">
      <cube-slide-item
        v-for="(item, index) in items"
        :key="index"
      >
        <a :href="item.url">
          <img :src="item.image" class="img"/>
        </a>
      </cube-slide-item>
    </cube-slide>
		<cube-slide ref="slide1" :data="lists" :auto-play="false">
      <cube-slide-item
        v-for="(list, index) in lists"
        :key="index"
      >
				<ul class="pro_list">
					<li v-for="(item,index1) in list" :key="index1">
						<a :href="item.url">
							<img :src="item.image" :alt="item.label">
							<p>{{item.label}}</p>
						</a>
					</li>
				</ul>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>
<script>
export default {
  data() {
    return {
			items: [],
			lists: []
    }
  },
  methods: {
		clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      console.log(label)
    },
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
    }
	},
	async created() {
		try {
			this.items = (await this.$http.get('/api/banner')).data;
			this.lists = (await this.$http.get('/api/rollinglist')).data;
		} catch (err) {
			console.log(err)
		}
	}
};
</script>
<style lang="stylus" scoped>
#Index {
	.img {
		width 100%
	}
	.pro_list {
		li {
			float left
			width 30px
			margin 10px 20px
			img {
				width 100%
				height 30px
			}
			p {
				font-size 12px
				color #ccc
			}
		}
	}
	
}
</style>