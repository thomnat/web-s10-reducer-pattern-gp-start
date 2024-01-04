import React from 'react'
import Todos from './Todos'
import TodoForm from './TodoForm'

let id = 1
const getNextId = () => id++
const todos = [
  { id: getNextId(), label: 'Laundry', complete: true },
  { id: getNextId(), label: 'Groceries', complete: false },
  { id: getNextId(), label: 'Dishes', complete: false },
]

export default function App() {
  return (
    <div id="mp">
      <h2>Guided Project</h2>
      <Todos
        todos={todos}
      />
      <TodoForm

      />
    </div>
  )
}
