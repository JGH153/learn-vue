import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../pages/Home.vue";
import NotFound from "../pages/NotFound.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../pages/About.vue"),
  },
  {
    path: "/todo/:id",
    name: "TodoPage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "todo" */ "../pages/TodoPage.vue"),
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
    name: "NotFound",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("Going from: ", from, " to: ", to);
  next(); // nothing, false, error, or new route
});

// router.afterEach((to, from) => {
// });

export default router;
