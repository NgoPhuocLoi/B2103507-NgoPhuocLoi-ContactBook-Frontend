<script setup>
import * as yup from "yup";
import { Form, ErrorMessage, Field } from "vee-validate";
import { reactive, ref } from "vue";
import UserService from "../services/user.service";
import { useRouter } from "vue-router";

const loading = ref(false);
const apiError = ref("");
const router = useRouter();
const userService = new UserService();

const user = reactive({
  username: "",
  password: "",
  confirmPassword: "",
});
const submit = async () => {
  loading.value = true;
  try {
    await userService.register(user);
    loading.value = false;
    alert("Đăng ký thành công. Đăng nhập ngay!");
    router.push("/auth/login");
  } catch (error) {
    apiError.value = "Tên đăng nhập đã tồn tại!";
    console.log({ mes: apiError.value });
    loading.value = false;
  }
};
const validateUsername = async (value) => {
  apiError.value = "";
  try {
    await yup
      .string()
      .required("Vui lòng điền username")
      .min(6, "Username phải trên 6 ký tự.")
      .validate(value);

    return true;
  } catch (error) {
    return error.message;
  }
};
const validatePassword = yup
  .string()
  .required("Vui lòng điền mật khẩu")
  .min(8, "Mật khẩu phải trên 8 ký tự");

const validateConfirmPassword = (value) => {
  return value === user.password ? true : "Nhập lại mật khẩu không khớp";
};
</script>

<template>
  <h4 class="text-center">Đăng Ký</h4>
  <Form @submit="submit">
    <div class="form-group mt-3">
      <label for="username">Tên đăng nhập</label>
      <Field
        name="username"
        type="text"
        class="form-control mt-1 text-secondary"
        v-model="user.username"
        :rules="validateUsername"
      />
      <ErrorMessage name="username" class="error-feedback" />
      <span class="error-feedback">{{ apiError }}</span>
    </div>
    <div class="form-group mt-3">
      <label for="password">Mật khẩu</label>
      <Field
        name="password"
        type="password"
        class="form-control mt-1 text-secondary"
        v-model="user.password"
        :rules="validatePassword"
      />
      <ErrorMessage name="password" class="error-feedback" />
    </div>
    <div class="form-group mt-3">
      <label for="confirmPassword">Nhập lại mật khẩu</label>
      <Field
        name="confirmPassword"
        type="password"
        class="form-control mt-1 text-secondary"
        v-model="user.confirmPassword"
        :rules="validateConfirmPassword"
      />
      <ErrorMessage name="confirmPassword" class="error-feedback" />
    </div>

    <div class="form-group mt-3">
      <button style="width: 100%" class="btn btn-primary w-full mt-4">
        <div
          v-if="loading"
          class="spinner-border text-white spinner-border-sm"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>

        <span v-else>Đăng Ký</span>
      </button>
    </div>

    <RouterLink to="/auth/login" class="mt-3 text-center text-small d-block"
      >Bạn đã có tài khoản? Đăng nhập ngay!</RouterLink
    >
  </Form>
</template>
