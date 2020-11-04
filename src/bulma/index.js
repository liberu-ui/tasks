import Vue from 'vue';
import App from '@enso-ui/ui/src/bulma/app';
import './icons';
import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';
import Navbar from './components/navbar/Tasks.vue';

const { $store: { commit }, $router } = App.root;

$router.addRoutes(routeImporter(require.context('./routes', false, /.*\.js$/)));

Vue.component('navbar-tasks', Navbar);
commit('packages/registerNavbar', { component: 'navbar-tasks' });
