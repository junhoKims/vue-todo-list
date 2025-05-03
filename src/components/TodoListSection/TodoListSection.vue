<script setup lang="ts">
import { ref } from 'vue'
import TodoSearch from './TodoSearch.vue'
import TodoList from './TodoList.vue'
import type { Todo } from './types'

const query = ref('')
const todos = ref<Todo[]>([])
const selected = ref<Todo['id'][]>([])

const handleChangeQuery = (value: string) => {
  query.value = value
}

const handleAddTodo = (todo: Todo) => {
  todos.value.push(todo)
  query.value = ''
}

const handleDeleteTodo = (argTodos: Todo[]) => {
  const removed = argTodos.filter((inTodo) => !argTodos.some((todo) => todo.id === inTodo.id))
  todos.value = removed
}

const handleSetSelected = (method: 'active' | 'deactive', ids: Todo['id'][]) => {
  switch (method) {
    case 'active':
      selected.value = [...new Set([...selected.value, ...ids])]
      break
    case 'deactive':
      selected.value = selected.value.filter((id) => !ids.includes(id))
      break

    default:
      throw new Error('Invalid method')
  }
}

const handleChangeStatus = (method: 'pending' | 'completed') => {
  todos.value = todos.value.map((todo) => {
    if (selected.value.includes(todo.id)) {
      return {
        ...todo,
        status: method,
      }
    }
    return todo
  })
}
</script>

<template>
  <section>
    <TodoSearch :query="query" :onChangeQuery="handleChangeQuery" :onAddTodo="handleAddTodo" />
    <TodoList
      :todos="todos"
      :selected="selected"
      :onDeleteTodo="handleDeleteTodo"
      :onSetSelected="handleSetSelected"
      :onChangeStatus="handleChangeStatus"
    />
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
