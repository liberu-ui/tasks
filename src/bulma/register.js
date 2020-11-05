import Vue from 'vue';
import App from '@enso-ui/ui/src/core/app';
import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';
import Tasks from './components/navbar/Tasks.vue';
import './icons';

const routes = routeImporter(require.context('./routes', false, /.*\.js$/));
App.addRoutes(routes);

Vue.component('navbar-tasks', Tasks);
App.registerNavbarItem('navbar-tasks', 100);
