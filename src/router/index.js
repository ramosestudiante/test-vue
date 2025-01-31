import { createRouter, createWebHistory } from "vue-router";
import scrollToTopScreen from "../utils/scrollToTopScreen";
import PageNotFound from "../pages/PageError.vue";
import DashboardTemplate from "../Layouts/DashboardTemplate.vue";
import Inicio from "../pages/Inicio.vue";

const defaultTitle = "Test Vue 3";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    component: PageNotFound,
    name: "Missing",
  },

  {
    path: "/",
    meta: { title: defaultTitle },
    name: "PrincipalLayout",
    component: DashboardTemplate,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Inicio,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || defaultTitle;

  if (to.meta.desable_automatic_scrolling !== true) {
    scrollToTopScreen();
  }

  next();
});

export default router;
