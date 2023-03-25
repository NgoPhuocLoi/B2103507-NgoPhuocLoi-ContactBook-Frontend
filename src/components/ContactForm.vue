<script setup>
import * as yup from "yup";
import { Form, ErrorMessage, Field } from "vee-validate";
import { ref } from "vue";
const { contact } = defineProps(["contact"]);
const emit = defineEmits(["submit:contact", "delete:contact"]);

const schema = yup.object({
  email: yup
    .string()
    .email("E-mail không đúng.")
    .required("Email phải có giá trị!")
    .max(50, "E-mail tối đa 50 ký tự."),
  address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
  name: yup
    .string()
    .required("Tên phải có giá trị.")
    .min(2, "Tên phải ít nhất 2 ký tự.")
    .max(50, "Tên có nhiều nhất 50 ký tự."),
  address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
  phone: yup
    .string()
    .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
});

const contactLocal = ref(contact);

const submitContact = () => {
  emit("submit:contact", contactLocal.value);
};

const deleteContact = () => {
  emit("delete:contact", contactLocal.value._id);
};
</script>

<template>
  <Form @submit="submitContact" :validation-schema="schema">
    <div class="form-group mt-3">
      <label for="name">Tên</label>
      <Field
        name="name"
        type="text"
        class="form-control mt-1 text-secondary"
        v-model="contactLocal.name"
        :rules="yup.string().min(8, 'Invalid')"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group mt-3">
      <label for="email">E-mail</label>
      <Field
        name="email"
        type="email"
        class="form-control mt-1 text-secondary"
        v-model="contactLocal.email"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>
    <div class="form-group mt-3">
      <label for="address">Địa chỉ</label>
      <Field
        name="address"
        type="text"
        class="form-control mt-1 text-secondary"
        v-model="contactLocal.address"
      />
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group mt-3">
      <label for="phone">Điện thoại</label>
      <Field
        name="phone"
        type="tel"
        class="form-control mt-1 text-secondary"
        v-model="contactLocal.phone"
      />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>
    <div class="form-group form-check mt-3">
      <input
        name="favorite"
        type="checkbox"
        class="form-check-input"
        v-model="contactLocal.favorite"
      />
      <label for="favorite" class="form-check-label">
        <strong>Liên hệ yêu thích</strong>
      </label>
    </div>
    <div class="form-group mt-3">
      <button class="btn btn-primary">
        <i class="fa-solid fa-floppy-disk me-2"></i><span>Lưu</span>
      </button>
      <button
        v-if="contactLocal._id"
        type="button"
        class="ml-2 btn btn-danger ms-3"
        @click="deleteContact"
      >
        <i class="fa-solid fa-trash me-2"></i>Xóa
      </button>
    </div>
  </Form>
</template>

<style scoped>
.error-feedback {
  font-size: 12px;
  color: red;
}
</style>
