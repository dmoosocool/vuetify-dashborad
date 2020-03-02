import Vue from "vue";
import VueRouter from "vue-router";
// import store from "@/store";

import admin from "./admin";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },

  admin
];

console.log(JSON.stringify(admin));
// routes.push(admin);

const router = new VueRouter({
  routes
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(r => r.meta.requireAuth)) {
//     if (store.state.auth.token) {
//       next();
//     } else {
//       next({
//         name: "Login"
//       });
//     }
//   } else {
//     next();
//   }
// });
export default router;
