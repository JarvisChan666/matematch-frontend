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
import { createPinia } from 'pinia';
import { setupRouterGuard } from './middlewares/auth';

import useUserStore from './store/user';

// Import Vue Router and routes
import router from './router';

import './middlewares/auth';

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

// After the app is mounted, restore user info from localStorage
const userStore = useUserStore();
if (localStorage.getItem('user')) {
	const userData = JSON.parse(localStorage.getItem('user'));
	userStore.userAccount = userData.userAccount;
	userStore.userInfo = userData;
}

setupRouterGuard(app);
