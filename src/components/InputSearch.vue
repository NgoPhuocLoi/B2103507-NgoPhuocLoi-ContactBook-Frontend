<script setup>
const { searchText } = defineProps(["searchText"]);
const emit = defineEmits(["update:searchText"]);

const updateSearchText = (e) => {
  emit("update:searchText", e.target.value);
};
</script>

<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder="Nhập thông tin cần tìm"
      :value="searchText"
      @input="updateSearchText"
      @keyup.enter="submit"
    />
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" @click="submit">
        <i class="fas fa-search"></i> Tìm kiếm
      </button>
    </div>
  </div>
</template>

<style scoped></style>
