<script setup lang="ts">
import type { Todo } from './types'

const props = defineProps<{
  todos: Todo[]
  selected: Todo['id'][]
  onDeleteTodo: (todos: Todo[]) => void
  onSetSelected: (method: 'active' | 'deactive', ids: Todo['id'][]) => void
  onChangeStatus: (method: 'pending' | 'completed') => void
}>()

const handleDeleteTodo = (todos: Todo[]) => {
  props.onDeleteTodo(todos)
  props.onSetSelected(
    'deactive',
    todos.map((todo) => todo.id),
  )
}

const handleToggleAllStatus = (method: 'active' | 'deactive') => {
  props.onSetSelected(
    method,
    props.todos.map((todo) => todo.id),
  )
}

const handleChangeSelected = (id: Todo['id']) => {
  const method = props.selected.includes(id) ? 'deactive' : 'active'
  props.onSetSelected(method, [id])
}

const handleChangeStatus = (method: 'pending' | 'completed') => {
  props.onChangeStatus(method)
}
</script>

<template>
  <div>
    <h5>todo list</h5>
    <div class="todo-list-header">
      <div>
        <button type="button" @click="handleToggleAllStatus('active')">all active</button>
        <button type="button" @click="handleToggleAllStatus('deactive')">all deactive</button>
      </div>
      <div>
        <button type="button" @click="handleChangeStatus('pending')">pending</button>
        <button type="button" @click="handleChangeStatus('completed')">completed</button>
      </div>
    </div>

    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id">
        <label :for="todo.id">
          <input
            :id="todo.id"
            type="checkbox"
            :checked="selected.includes(todo.id)"
            :value="todo.id"
            @change="handleChangeSelected(todo.id)"
          />

          <span>{{ todo.title }}</span>
          <div
            class="todo-list-item-status"
            :class="
              todo.status === 'pending'
                ? 'todo-list-item-status__pending'
                : 'todo-list-item-status__completed'
            "
          >
            {{ todo.status }}
          </div>
        </label>
        <button type="button" @click="handleDeleteTodo([todo])">X</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.todo-list-header {
  display: flex;
  gap: 16px;

  & > div {
    display: flex;
    gap: 4px;

    & > button {
      cursor: pointer;
    }
  }
}

.todo-list {
  display: flex;
  flex-direction: column;
  padding: 0;
  padding-top: 16px;

  & > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    width: 100%;
  }

  & > li > label {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 90%;

    & > span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: fit-content;
      max-width: 75%;
    }
  }
}

.todo-list-item-status__pending {
  color: white;
  background-color: #333333;
  border: 1px solid #888888;
  border-radius: 12px;
  padding: 2px 5px;
  font-size: 12px;
}

.todo-list-item-status__completed {
  color: white;
  background-color: #3d794c;
  border: 1px solid #319d4c;
  border-radius: 12px;
  padding: 3px 6px;
  font-size: 12px;
}
</style>
