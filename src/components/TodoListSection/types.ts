export type TodoStatus = 'pending' | 'completed'

export interface Todo {
  id: string
  title: string
  status: TodoStatus
}
