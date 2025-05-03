<script setup lang="ts">
import type { Todo } from './types'

const props = defineProps<{
  query: string
  onChangeQuery: (query: string) => void
  onAddTodo: (todo: Todo) => void
}>()

const handleChangeQuery = (event: Event) => {
  const { value } = event.target as HTMLInputElement
  props.onChangeQuery(value)
}

const handleAddTodo = () => {
  props.onAddTodo({
    id: String(Date.now()),
    title: props.query.trim(),
    status: 'pending',
  })
}
</script>

<template>
  <input
    type="text"
    :value="query"
    @input="handleChangeQuery($event)"
    @keydown.enter="handleAddTodo"
  />
</template>
