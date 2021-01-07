import Vue from 'vue';
import App from '@enso-ui/ui/src/core/app';
import Tasks from './components/navbar/Tasks.vue';

Vue.component('navbar-tasks', Tasks);
App.registerNavbarItem('navbar-tasks', 100, 'tasks.count');
