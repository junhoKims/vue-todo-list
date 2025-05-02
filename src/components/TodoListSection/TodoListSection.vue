<script setup lang="ts">
import { ref } from 'vue'
import TodoSearch from './TodoSearch.vue'

const query = ref('')

const handleChangeQuery = (value: string) => {
  query.value = value
}
</script>

<template>
  <section>
    <TodoSearch :query="query" :onChangeQuery="handleChangeQuery" />
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
