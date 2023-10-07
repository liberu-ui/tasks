/** Import the routeImporter function from the routeImporter module */
import routeImporter from '@liberu-ui/ui/src/modules/importers/routeImporter';

/**
 * Load all JavaScript files in the './tasks' directory and pass them to the routeImporter function.
 * It returns an array of route objects.
 */
const routes = routeImporter(require.context('./tasks', false, /.*\.ts$/));

/**
 * Import the RouterView component from the Router.vue file.
 */
const RouterView = () => import('@liberu-ui/ui/src/bulma/pages/Router.vue');

/**
 * The route configuration object for the '/tasks' path.
 */
export default {
    /**
     * The path of the '/tasks' route.
     */
    path: '/tasks',
    
    /**
     * The component to be rendered for the '/tasks' route.
     */
    component: RouterView,
    
    /**
     * Meta information associated with the '/tasks' route.
     */
    meta: {
        /**
         * The breadcrumb label for the '/tasks' route.
         */
        breadcrumb: 'tasks',
        
        /**
         * The route name for the '/tasks' route.
         */
        route: 'tasks.index',
    },
    
    /**
     * The child routes of the '/tasks' route.
     */
    children: routes,
};