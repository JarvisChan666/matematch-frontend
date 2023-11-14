import Index from "../pages/Index.vue";
import TeamPage from "../pages/TeamPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserPage from "../pages/UserPage.vue";


const routes = [
    {
        path: '/',
        component: Index,
    },
    {
        path: '/team',
        component: TeamPage,
    },
    {
        path: '/user',
        component: SearchPage,
    },
    {
        path: '/search',
        component: UserPage,
    },
]
export default routes;