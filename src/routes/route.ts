import Index from '../pages/Index.vue';
import TeamPage from '../pages/TeamPage.vue';
import SearchPage from '../pages/SearchPage.vue';
import UserPage from '../pages/UserPage.vue';
import UserEditPage from '../pages/UserEditPage.vue';
import SearchResultPage from '../pages/SearchResultPage.vue';
import SkeletonPage from "../pages/SkeletonPage.vue";
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
  {
    path: '/user/list',
    name: 'List',
    component: SearchResultPage,
  },
  {
    path: '/user/list/skeleton',
    name: 'Skeleton',
    component: SkeletonPage,
    meta: { showSkeleton: true },
  },
];
export default routes
