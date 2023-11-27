import Index from '../pages/Index.vue';
import TeamPage from '../pages/TeamPage.vue';
import SearchPage from '../pages/SearchPage.vue';
import UserPage from '../pages/UserPage.vue';
import UserLoginPage from '../pages/UserLoginPage.vue';
import UserEditPage from '../pages/UserEditPage.vue';
import SearchResultPage from '../pages/SearchResultPage.vue';
import UserRegisterPage from '../pages/UserRegisterPage.vue';
import UserLayout from '../layouts/UserLayout.vue'; // Corrected the case
import { RouteRecordRaw } from 'vue-router';
import BasicLayout from '../layouts/BasicLayout.vue';

export const routes: Array<RouteRecordRaw> = [
	{
		path: '/team',
		name: 'Team',
		component: TeamPage,
	},
	{
		path: '/search',
		name: 'Search',
		component: SearchPage,
	},
	{
		path: '/list',
		name: 'List',
		component: SearchResultPage,
	},
	{
		path: '/user',
		name: 'User',
		component: UserLayout, // Corrected the case
		children: [
			{
				path: 'login',
				name: 'Login',
				component: UserLoginPage,
				meta: { layout: 'UserLayout' },
			},
			{
				path: 'info',
				name: 'Info',
				component: UserPage,
			},
			{
				path: 'register',
				name: 'Register',
				component: UserRegisterPage,
				meta: { layout: 'UserLayout' },
			},
			{
				path: 'edit',
				name: 'Edit',
				component: UserEditPage,
			},
		],
	},
];

export default routes;
