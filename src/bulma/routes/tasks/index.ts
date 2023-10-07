/**
 * This is the Index component that represents the Tasks Index page.
 * @component
 */

import { Component } from 'vue';

// Import the Index.vue component dynamically
const Index: Component = () => import('../../pages/tasks/Index.vue');

/**
 * Represents the route configuration object for tasks.index.
 * @interface RouteConfig
 */
interface RouteConfig {
    name: string;
    path: string;
    component: Component;
    meta: {
        breadcrumb: string;
        title: string;
    };
}

/**
 * The route configuration object for the tasks.index route.
 * @exports
 * @type {RouteConfig}
 */
const routeConfig: RouteConfig = {
    name: 'tasks.index',
    path: '',
    component: Index,
    meta: {
        breadcrumb: 'index',
        title: 'Tasks',
    },
};

export default routeConfig;