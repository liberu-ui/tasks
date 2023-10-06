import routeImporter from '@liberu-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./tasks', false, /.*\.js$/));
const RouterView = () => import('@liberu-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: '/tasks',
    component: RouterView,
    meta: {
        breadcrumb: 'tasks',
        route: 'tasks.index',
    },
    children: routes,
};
