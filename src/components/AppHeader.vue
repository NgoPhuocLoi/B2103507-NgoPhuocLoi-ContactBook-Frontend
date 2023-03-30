<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const token = ref(localStorage["accessToken"]);
const username = ref(localStorage["username"]);

watch(route, () => {
  token.value = localStorage["accessToken"];
  username.value = localStorage["username"];
});

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("username");
  token.value = "";
  username.value = "";
  router.push("/auth/login");
};
</script>

<template>
  <nav
    class="navbar navbar-expand navbar-dark bg-dark px-4 d-flex justify-content-between"
  >
    <div class="d-flex">
      <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
      <div class="mr-auto navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'contactbook' }" class="nav-link">
            Danh bạ
            <i class="fas fa-address-book"></i>
          </router-link>
        </li>
      </div>
    </div>

    <div>
      <RouterLink v-if="!token" to="/auth" class="btn btn-primary"
        >Đăng nhập</RouterLink
      >

      <div class="d-flex align-items-center" v-else>
        <span class="text-white">Xin chào {{ username }}</span>
        <button class="btn btn-danger ms-4" @click="logout">Đăng xuất</button>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
