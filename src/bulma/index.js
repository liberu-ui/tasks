import Vue from 'vue';
import App from '@enso-ui/ui/src/bulma/app';
import './icons';
import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';
import RouteMerger from '@enso-ui/ui/src/modules/importers/RouteMerger';
import Navbar from './components/navbar/Tasks.vue';

const routes = [];

(new RouteMerger(routes))
    .add(routeImporter(require.context('./routes', false, /.*\.js$/)));

Vue.component('navbar-tasks', Navbar);

App.use(({ $store: { commit }, $router }) => {
    console.log('routes\t', routes);
    $router.addRoutes(routes);
    commit('packages/registerNavbar', { component: 'navbar-tasks' });
});
