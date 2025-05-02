<script setup lang="ts">
const props = defineProps<{
  query: string
  onChangeQuery: (query: string) => void
}>()

const handleChangeQuery = (event: Event) => {
  const { value } = event.target as HTMLInputElement
  props.onChangeQuery(value)
}
</script>

<template>
  <input type="text" :value="query" @change="handleChangeQuery($event)" />
</template>
