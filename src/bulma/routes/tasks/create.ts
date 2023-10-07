/**
 * This file defines a TypeScript module for the task creation feature.
 */

import { Component } from 'vue';

/**
 * The Create component represents the page for creating a new task.
 * @component
 */
const Create: Component = () => import('../../pages/tasks/Create.vue');

export default {
  /**
   * The name of the route associated with the task creation page.
   * @type {string}
   */
  name: 'tasks.create',

  /**
   * The path of the route associated with the task creation page.
   * @type {string}
   */
  path: 'create',

  /**
   * The component to be rendered for the task creation page.
   * @type {Component}
   */
  component: Create,

  /**
   * Metadata for the task creation page.
   * @type {Object}
   */
  meta: {
    /**
     * The breadcrumb label for the task creation page.
     * @type {string}
     */
    breadcrumb: 'create',

    /**
     * The title of the task creation page.
     * @type {string}
     */
    title: 'Create Task',
  },
};
