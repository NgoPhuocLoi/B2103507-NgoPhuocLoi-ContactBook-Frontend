<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import ContactCard from "../components/ContactCard.vue";
import ContactList from "../components/ContactList.vue";
import InputSearch from "../components/InputSearch.vue";
import contactService from "../services/contact.service";

const ContactService = new contactService();
const contacts = ref([]);
const activeIndex = ref(-1);
const searchText = ref("");
const router = useRouter();

const getAllContacts = async () => {
  try {
    const res = await ContactService.getAll();
    contacts.value = res.contacts;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await getAllContacts();
});

watch(searchText, () => {
  activeIndex.value = -1;
});

const filteredContacts = computed(() => {
  if (!searchText.value) return contacts.value;
  return contacts.value.filter((contact) =>
    contact.name.includes(searchText.value)
  );
});

const filteredContactsCount = computed(() => filteredContacts.value.length);

const activeContact = computed(() => filteredContacts.value[activeIndex.value]);

const refreshList = async () => {
  await getAllContacts();
  activeIndex.value = -1;
};

const goToAddContact = () => {
  router.push("/contacts/add");
};

const removeAllContacts = async () => {
  if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
    try {
      await ContactService.deleteAll();
      await getAllContacts();
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model:searchText="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh bạ
        <i class="fas fa-address-book"></i>
      </h4>
      <ContactList
        v-if="filteredContactsCount > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />

      <p v-else>Không có liên hệ nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <div class="col">
          <button class="btn btn-sm btn-primary" @click="refreshList">
            <i class="fas fa-redo"></i> Làm mới
          </button>
        </div>
        <div class="col">
          <button class="btn btn-sm btn-success" @click="goToAddContact">
            <i class="fas fa-plus"></i> Thêm mới
          </button>
        </div>
        <div class="col">
          <button class="btn btn-sm btn-danger" @click="removeAllContacts">
            <i class="fas fa-trash"></i> Xóa tất cả
          </button>
        </div>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeContact">
        <h4>
          Chi tiết Liên hệ
          <i class="fas fa-address-card"></i>
        </h4>
        <ContactCard :contact="activeContact" />
        <RouterLink
          :to="{
            name: 'contact.edit',
            params: { id: activeContact._id },
          }"
        >
          <span class="mt-2 badge bg-warning text-black">
            <i class="fas fa-edit"></i> Hiệu chỉnh
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
