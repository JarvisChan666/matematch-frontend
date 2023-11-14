import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
// import {Button} from 'vant';
import 'vant/lib/index.css';
import {NavBar} from 'vant';
// import {Icon} from 'vant';
import Vant from 'vant';
import routes from './routes/route'
import * as VueRouter from 'vue-router';

const app = createApp(App);
const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

// 3. 注册你需要的组件
// app.use(Button)
// app.use(Icon)
app.use(NavBar)
app.use(Vant)
app.use(router)
    .mount('#app')
