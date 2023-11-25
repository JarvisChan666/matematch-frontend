import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { routes } from './routes';
// Create a router
const router = createRouter({
	history: createWebHistory(),
	routes,
});
export default router;
