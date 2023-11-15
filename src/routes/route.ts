import Index from '../pages/Index.vue';
import TeamPage from '../pages/TeamPage.vue';
import SearchPage from '../pages/SearchPage.vue';
import UserPage from '../pages/UserPage.vue';
import UserEditPage from '../pages/UserEditPage.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index,
  },
  {
    path: '/team',
    name: 'Team',
    component: TeamPage,
  },
  {
    path: '/user',
    name: 'User',
    component: UserPage,
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchPage,
  },
  {
    path: '/user/edit',
    name: 'Edit',
    component: UserEditPage,
  },
];
export default routes;
