<script setup>
import { ErrorMessage, Field, Form } from "vee-validate";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import UserService from "../services/user.service";

const loading = ref(false);
const apiError = ref("");
const router = useRouter();
const userService = new UserService();

const user = reactive({
  username: "",
  password: "",
});

const submit = async () => {
  loading.value = true;
  try {
    const res = await userService.login(user);
    loading.value = false;
    localStorage.setItem("accessToken", res.data.token);
    localStorage.setItem("username", user.username);
    router.push("/");
  } catch (error) {
    apiError.value = "Sai tên đăng nhập hoặc mật khẩu!";
    loading.value = false;
  }
};
const schema = yup.object({
  username: yup
    .string()
    .required("Vui lòng điền tên đăng nhập")
    .min(6, "Tên đăng nhập phải trên 6 ký tự."),
  password: yup
    .string()
    .required("Vui lòng điền mật khẩu")
    .min(8, "Mật khẩu phải trên 8 ký tự"),
});
</script>

<template>
  <h4 class="text-center">Đăng nhập</h4>
  <Form @submit="submit" :validation-schema="schema">
    <div class="form-group mt-3">
      <label for="username">Tên đăng nhập</label>
      <Field
        name="username"
        type="text"
        class="form-control mt-1 text-secondary"
        v-model="user.username"
      />
      <ErrorMessage name="username" class="error-feedback" />
    </div>
    <div class="form-group mt-3">
      <label for="password">Mật khẩu</label>
      <Field
        name="password"
        type="password"
        class="form-control mt-1 text-secondary"
        v-model="user.password"
      />
      <ErrorMessage name="password" class="error-feedback" />
    </div>
    <span class="error-feedback">{{ apiError }}</span>
    <div class="form-group mt-3">
      <button style="width: 100%" class="btn btn-primary w-full mt-4">
        <div
          v-if="loading"
          class="spinner-border text-white spinner-border-sm"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>

        <span v-else>Đăng Nhập</span>
      </button>
    </div>

    <RouterLink to="/auth/register" class="mt-3 text-center text-small d-block"
      >Bạn chưa có tài khoản? Đăng kí ngay!</RouterLink
    >
  </Form>
</template>
