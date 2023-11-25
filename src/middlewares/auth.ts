import useUserStore from '../store/user';
import router from '../router';
import Cookies from 'js-cookie';

export function setupRouterGuard(app) {
	const userStore = useUserStore();
	router.beforeEach((to, from, next) => {
		if (to.path === '/user/login') {
			console.log('1' + userStore.userInfo);
			next();
		} else if (localStorage.getItem('user')) {
			next();
		} else {
			next('/user/login');
		}
	});
}
