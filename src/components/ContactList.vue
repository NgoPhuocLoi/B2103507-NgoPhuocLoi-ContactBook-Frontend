<script setup>
const { contacts, activeIndex } = defineProps(["contacts", "activeIndex"]);
const emit = defineEmits(["update:activeIndex"]);

const updateActiveIndex = (index) => {
  emit("update:activeIndex", index);
};
</script>

<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(contact, index) in contacts"
      :key="contact._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ contact.name }}
    </li>
  </ul>
</template>

<style scoped></style>
