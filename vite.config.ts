import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // 引入path模块

// https://vitejs.dev/config/
export default defineConfig({
	// base: '/matematch-frontend/',
	// publicPath: './',
	plugins: [vue()],
	build: {
		outDir: 'dist',
	},
	// allow all ip to use app
	server: {
		host: '0.0.0.0',
	},
});
