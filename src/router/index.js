/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import AdminLayout from "@/layout/admin";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    redirect: {
      name: "AdminHome"
    }
  },
  {
    path: "/user/login",
    name: "Login",
    meta: { requireAuth: false },
    component: () => import("../views/admin/Login.vue")
  },

  {
    path: "/admin",
    component: AdminLayout,
    redirect: "/admin/index",
    hidden: true,
    children: [
      {
        path: "index",
        name: "AdminHome",
        component: () =>
          import(/* webpackChunkName: "AdminHome" */ "@/views/admin/Home")
      },
      {
        path: "user",
        name: "AdminUser",
        component: () =>
          import(/* webpackChunkName: "AdminUser" */ "@/views/admin/User")
      },
      {
        path: "good",
        name: "AdminGood",
        component: () =>
          import(/* webpackChunkName: "AdminGood" */ "@/views/admin/Good")
      },
      {
        path: "room",
        name: "AdminRoom",
        component: () =>
          import(/* webpackChunkName: "AdminRoom" */ "@/views/admin/Room")
      }
    ]
  },

  {
    path: "/member",
    component: AdminLayout,
    redirect: "/member/index",
    children: [
      {
        path: "index",
        name: "MemberHome",
        component: () =>
          import(/* webpackChunkName: "MemberHome" */ "@/views/guest/Home")
      },
      {
        path: "account",
        name: "MemberAccount",
        component: () =>
          import(
            /* webpackChunkName: "MemberAccount" */ "@/views/guest/Account"
          )
      },
      {
        path: "room",
        name: "MemberRoom",
        component: () =>
          import(/* webpackChunkName: "MemberRoom" */ "@/views/guest/Room")
      },
      {
        path: "info",
        name: "MemberInfo",
        component: () =>
          import(/* webpackChunkName: "MemberInfo" */ "@/views/guest/Info")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, _from, _next) => {
  let requireAuth = to.meta.requireAuth;

  if (requireAuth === undefined) {
    requireAuth = true;
  }

  if (!requireAuth) {
    _next();
  } else {
    if (store.state.auth.token) {
      _next();
    } else {
      _next({ name: "Login" });
    }
  }
});
export default router;
