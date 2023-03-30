import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
const routes = [
  {
    path: "/",
    name: "contactbook",
    beforeEnter: () => {
      return localStorage["accessToken"] ? true : "/auth/login";
    },
    component: ContactBook,
  },
  {
    path: "/contacts/add",
    name: "contact.add",
    component: () => import("@/views/ContactAdd.vue"),
  },
  {
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("@/views/ContactEdit.vue"),
    props: true,
  },
  {
    path: "/auth",
    component: () => import("@/views/Auth.vue"),
    redirect: "/auth/login",
    beforeEnter: (to, from) => {
      return !localStorage["accessToken"] ? true : "/";
    },
    children: [
      {
        path: "login",
        component: () => import("@/components/LoginForm.vue"),
      },
      {
        path: "register",
        component: () => import("@/components/RegisterForm.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
