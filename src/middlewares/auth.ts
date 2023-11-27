import useUserStore from '../store/user';
import router from '../router';

export function setupRouterGuard(app) {
	const userStore = useUserStore();
	router.beforeEach(async (to, from, next) => {
		const { path } = to;
		if (path === '/user/login' || path === '/user/register') {
			console.log('auth1');
			return next();
		}
		// Check if a user is currently logged in
		const user = await userStore.getCurrentUser();

		// If a user is logged in, allow navigation
		// Otherwise, redirect to the login page
		return user ? next() : next('/user/login');

		// if (to.path === '/user/login') {
		// 	console.log('auth' + userStore.userInfo);
		// 	next();
		// } else {
		// 	userStore.getCurrentUser().then((user) => {
		// 		if (user) {
		// 			console.log('auth1');
		// 			next();
		// 		} else {
		// 			console.log('auth2');
		// 			next('/user/login');
		// 		}
		// 	});
		// }
	});
}
