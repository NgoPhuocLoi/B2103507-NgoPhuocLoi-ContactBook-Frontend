<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ContactForm from "../components/ContactForm.vue";
import contactService from "../services/contact.service";
const ContactService = new contactService();
const route = useRoute();
const router = useRouter();
const contact = ref();
const message = ref("");

onMounted(async () => {
  const res = await ContactService.get(route.params.id);
  contact.value = res.contact[0];
});

const updateContact = async (newContact) => {
  try {
    await ContactService.update(contact.value._id, newContact);
    message.value = "Liên hệ được cập nhật thành công.";
  } catch (error) {
    console.log(error);
  }
};

const deleteContact = async (id) => {
  try {
    if (confirm("Bạn muốn xóa Liên hệ này?")) {
      await ContactService.delete(id);
      router.push({ name: "contactbook" });
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div v-if="contact" class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>
    <ContactForm
      :contact="contact"
      @submit:contact="updateContact"
      @delete:contact="deleteContact"
    />
    <p class="success-message">{{ message }}</p>
  </div>
</template>

<style scoped>
.success-message {
  color: green;
  font-size: 14px;
  margin-top: 4px;
}
</style>
