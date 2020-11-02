import Vue from 'vue';
import Navbar from './bulma/components/navbar/Tasks.vue';

Vue.component('navbar-tasks', Navbar);

export default ({ $store: { commit } }) => commit(
    'packages/registerNavbar', { component: 'navbar-tasks' },
);
