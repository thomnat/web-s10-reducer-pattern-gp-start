import React, { useReducer } from 'react'
import Todos from './Todos'
import TodoForm from './TodoForm'

const TOGGLE_SHOW_COMPLETED_TODOS = 'TOGGLE_SHOW_COMPLETED_TODOS'
const ADD_NEW_TODO = 'ADD_NEW_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

let id = 1
const getNextId = () => id++
const initialTodos = {
  showCompletedTodos: true,
  todos: [
    { id: getNextId(), label: 'Laundry', complete: true },
    { id: getNextId(), label: 'Groceries', complete: false },
    { id: getNextId(), label: 'Dishes', complete: false },
  ],
}

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_NEW_TODO: {
      return { ...state, todos: [...state.todos, action.payload] }
    }
    case TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos.map(td => {
          if (td.id != action.payload) return td
          return { ...td, complete: !td.complete }
        })
      }
    }
    case TOGGLE_SHOW_COMPLETED_TODOS: {
      return {
        ...state,
        showCompletedTodos: !state.showCompletedTodos
      }
    }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialTodos)

  const createNewTodo = (label, complete) => {
    const newTodo = { id: getNextId(), label, complete }
    dispatch({ type: ADD_NEW_TODO, payload: newTodo })
  }
  const toggleTodo = id => {
    dispatch({ type: TOGGLE_TODO, payload: id })
  }
  const toggleShowCompletedTodos = () => {
    dispatch({ type: TOGGLE_SHOW_COMPLETED_TODOS })
  }

  return (
    <div id="mp">
      <h2>Guided Project</h2>
      <Todos
        todos={state.todos}
        toggleTodo={toggleTodo}
        showCompletedTodos={state.showCompletedTodos}
        toggleShowCompletedTodos={toggleShowCompletedTodos}
      />
      <TodoForm
        createNewTodo={createNewTodo}
      />
    </div>
  )
}
