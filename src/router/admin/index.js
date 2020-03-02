import login from "./login";

export default {
  path: "/admin",
  component: () => import("@/views/Auth.vue"),
  children: login
};
