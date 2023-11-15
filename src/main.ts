// Import Vue and createApp function
import { createApp } from 'vue';

// Import global styles
import './style.css';

// Import App component
import App from './App.vue';

// Import Vant components and styles

import 'vant/lib/index.css';
import Vant from 'vant';

// Import Vue Router and routes
import * as VueRouter from 'vue-router';
import routes from './routes/route';

// Create a router
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

// Create a new Vue app instance
const app = createApp(App);

// Register Vant components and Vue Router

app.use(Vant);
app.use(router);
// Mount the app to the DOM
app.mount('#app');
