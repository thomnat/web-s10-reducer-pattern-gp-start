import React from 'react'

export default function TodoForm() {
  return (
    <form id="todoForm">
      <h3>New Todo Form</h3>
      <label><span>Todo label:</span>
        <input
          type='text'
          name='todoLabel'
          placeholder='Type label'
        />
      </label>
      <label><span>Is completed:</span>
        <input
          type='checkbox'
          name='todoIsCompleted'
        />
      </label>
      <label><span>Create todo:</span>
        <input
          type='submit'
          value='Do it!'
        />
      </label>
    </form>
  )
}
