import router from './router/index'
import store from './store/index'
import Axios from 'axios'

export default function setAxios() {
    // 请求拦截
    Axios.interceptors.request.use(
        config => {
            if(store.state.token) {
                config.headers.token = store.state.token;
            }
            return config;
        }
    )
    // 每次请求有返回都是通过这个拦截器
    Axios.interceptors.response.use(
        response => {
            // 这里模拟的是后台返回请求的状态码，根据状态码来判断要做何种操作
            if(response.status == 200) {
                // 为了节省axios每次返回的数据带多一层data属性
                const data = response.data;
                // 登陆的token失效，需要清空
                if(data.code == -2) {
                    store.dispatch('setToken', '');
                    window.localStorage.removeItem('token');
                    // 跳转到登陆页面
                    router.replace({path: 'login'});
                }
                return data;
            }
        }
    )
}

