<script setup>
import { useRouter } from "vue-router";
import ContactForm from "../components/ContactForm.vue";
import contactService from "../services/contact.service";

const router = useRouter();

const contact = {
  name: "",
  email: "",
  address: "",
  phone: "",
};

const handleAddContact = async (contact) => {
  const ContactService = new contactService();
  try {
    await ContactService.create(contact);
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="page">
    <h4>Thêm Liên hệ</h4>
    <ContactForm :contact="contact" @submit:contact="handleAddContact" />
  </div>
</template>

<style scoped></style>
