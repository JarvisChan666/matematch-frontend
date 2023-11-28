// Import Vue and createApp function
import { createApp } from 'vue';

// Import global styles
import './style.css';
import pinia from './store';
// Import App component
import App from './App.vue';
// import authRouter from './middlewares/auth';
// Import Vant components and styles

import 'vant/lib/index.css';
import Vant from 'vant';
import { Lazyload } from 'vant';
// import { createPinia } from 'pinia';
import { setupRouterGuard } from './middlewares/auth';

import useUserStore from './store/user';

// Import Vue Router and routes
import router from './router';

import './middlewares/auth';

import { createPinia } from 'pinia';

// Create a new Vue app instance
const app = createApp(App);
const pinia = createPinia();

// Register Vant components and Vue Router
app.use(Vant);
app.use(router);
app.use(pinia);
app.use(Lazyload);
// app.use(authRouter);
// Mount the app to the DOM
app.mount('#app');

// 刷新后仍展示用户信息
async function fetchUser() {
	const userStore = useUserStore();
	try {
		const data = await userStore.getCurrentUser();
		console.log(data.userAccount);
		userStore.userInfo = data;
	} catch (error) {
		console.error('Failed to get current user:', error);
	}
}

fetchUser();

// 本地存储可选
// if (localStorage.getItem('user')) {
// 	const userData = JSON.parse(localStorage.getItem('user'));
// 	userStore.userAccount = userData.userAccount;
// 	userStore.userInfo = userData;
// }

setupRouterGuard(app);
