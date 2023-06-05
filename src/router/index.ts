import { createRouter, createWebHistory } from "vue-router";
import ClientsLayout from "@/clients/layout/ClientsLayout.vue";
import CounterOptionsPage from "@/counter/pages/CounterOptionsPage.vue";
import CounterSetupPage from "@/counter/pages/CounterSetupPage.vue";
import ListPage from "@/clients/pages/ListPage.vue"
import ClientPage from "@/clients/pages/ClientPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'counter-1',
      component: CounterOptionsPage,
    },
    {
      path: '/counter-2',
      name: 'counter-2',
      component: CounterSetupPage,
    },
    {
      path: '/clients',
      name: 'clients',
      component: ClientsLayout,
      redirect: { name: 'list' },
      children: [
        {
          path: 'list',
          name: 'list',
          component: ListPage
        },
        {
          path: '/clients/:id',
          name: 'client-id',
          component: ClientPage
        }
      ]
    }
  ],
});

export default router;
