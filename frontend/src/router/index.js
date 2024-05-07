import { createRouter, createWebHashHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import JobResultsView from '@/views/JobResultsView.vue';
import JobView from '@/views/JobView.vue';
import TeamsView from '@/views/TeamsView.vue';

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
    path: '/teams',
    name: 'Teams',
    component: TeamsView
  },
  {
    path: '/jobs/results/:id',
    name: 'JobListing',
    component: JobView
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: 'smooth' };
  }
});

export default router;
