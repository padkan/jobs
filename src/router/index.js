import { createRouter, createWebHashHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import JobResultsView from '@/views/JobResultsView.vue';
import JobView from '@/views/JobView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/jobs/results',
    name: 'JobResult',
    component: JobResultsView
  },
  {
    path: '/jobs/result/:id',
    name: 'JobListing',
    component: JobView
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
