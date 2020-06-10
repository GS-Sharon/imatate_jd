<template>
  <div id="login">
    <cube-form :model="model" :schema="schema" :immediate-validate="false" @submit="submitHandler"></cube-form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      schema: {
        groups: [
          {
            fields: [
              {
                type: "input",
                label: "用户名：",
                modelKey: "username",  //关联model中的数据
                props: {
                  type: "text",  //input元素的text类型
                  placeholder: "请输入用户名"
                },
                rules: {
                  required: true,   //是否为必填
                  type: "string",
                  min: 3,
                  max: 15
                },
                // validating when blur
                trigger: "blur",  //失焦的时候进行验证
                messages: {
                  required: "用户名不能为空", //错误信息对应的是rules的属性
                  min: "用户名不能少于3个字符",
                  max: "用户名不能大于10个字符"
                }
              },
              {
                type: "input",
                label: "密码：",
                modelKey: "password",
                props: {
                  type: "password",
                  placeholder: "请输入内容",
                  eye: {
                    open: false  //设置密码眼睛为关闭
                  }
                },
                rules: {
                  max: 10,
                  required: true
                },
                messages: {
                  required: "密码不能为空",
                  max: "密码不能超过10个字符"
                },
                trigger: "blur"
              }
            ]
          },
          {
            fields: [
              {
                type: "submit",
                label: "登陆"
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    async submitHandler(e) {
      e.preventDefault();
			// 校验通过，提交事件
			try {
				let result = await this.$http.get("/api/login", {params:this.model}); //如果是get提交，则第二个参数为{params: this.model}
				if(result.code == 0) {
					alert("登陆成功");
					this.$store.dispatch('setToken',result.token);
          window.localStorage.setItem('token',this.$store.state.token);
          // 判断是否有历史跳转记录，无则跳转到首页
          if(this.$route.query.redirect) {
            this.$router.push({path:this.$route.query.redirect});
          } else {
            this.$router.push({path: '/botbar'});
          }
				} else {
					alert("登陆失败");
				}
			} catch(err) {
				alert(err);
			}
		}

  }
};
</script>
<style lang="stylus"></style>