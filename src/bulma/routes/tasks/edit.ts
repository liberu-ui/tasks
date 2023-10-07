import { Component, Ref } from 'vue';

/* 
    The type of the path parameter in the URL.
*/
type TaskPathParam = string;

/* 
    The type of the Task component.
*/
type TaskComponent = Component;

/* 
    The type of the meta property in the route object.
*/
type RouteMeta = {
  breadcrumb: string;
  title: string;
};

/* 
    The type of the route object.
*/
type TaskRoute = {
  name: string;
  path: string;
  component: TaskComponent;
  meta: RouteMeta;
};

/* 
    The function that imports the TaskEdit component lazily.
*/
const importTaskEdit = (): Promise<any> => import('../../pages/tasks/Edit.vue');

/*
    The TaskEditRoute object specifying the route for editing a task.
*/
const TaskEditRoute: TaskRoute = {
  name: 'tasks.edit',
  path: ':task/edit',
  component: importTaskEdit,
  meta: {
    breadcrumb: 'edit',
    title: 'Edit Task',
  },
};

export default TaskEditRoute;