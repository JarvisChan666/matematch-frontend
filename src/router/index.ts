import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { routes } from './routes';
// Create a router
// histroy模式
const router = createRouter({
	// history: createWebHistory()
	// history: createWebHistory('/matematch-frontend/'), //githubpage
	history: createWebHistory(),
	routes,
});
// 为了给不是vue文件组合式api，比如ts文件中用router，这里将其实例化并导出
export default router;
