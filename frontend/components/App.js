import React, { useReducer } from "react";
import Todos from "./Todos";
import TodoForm from "./TodoForm";

let id = 1;
const getNextId = () => id++;
// const todos = [ this was declared before we decided to hold our to dos in our state
//   { id: getNextId(), label: "Laundry", complete: true },
//   { id: getNextId(), label: "Groceries", complete: false },
//   { id: getNextId(), label: "Dishes", complete: false },
// ];

//now lets declare our actions to pass into our reducer for our switch cases that will alter our state
const TOGGLE_SHOW_COMPLETED_TODOS = "TOGGLE_SHOW_COMPLETED_TODOS"; //so an action of type TOGGLE_SHOW_COMPLETED_TODOS, which is the name declaration part - the left of the equal sign - the const TOGGLE_SHOW_COMPLETED_TODOS is the action.type which could be dispatched on click of the Hide Completed Todos button
const TOGGLE_TODO = "TOGGLE_TODO"; //an action type of TOGGLE_TODO would be dispatched when we click on a todo in order to mark is as completed

const ADD_NEW_TODO = "ADD_NEW_TODO"; //and an action type of ADD_NEW_TODO would be dispatched in response to this form being submitted

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_NEW_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((td) => {
          //so we are mapping over each todo
          if (td.id != action.payload) return td; //what we need to know is the id of the todos complete status we want to toggle. so if the id of the current td is NOT matching the one held in the action.payload return the td unchanged
          return { ...td, complete: !td.complete }; //otherwise, return a fresh new object which is a shallow copy of the current td where the complete property is the old one turned on its head
        }),
      };
    case TOGGLE_SHOW_COMPLETED_TODOS:
      return {
        ...state,
        showCompletedTodos: !state.showCompletedTodos, //we don't need a payload for this one because it just holds a boolean state so we just need to flip the switch and have showCompletedTodos be the opposite of what it currently is
      };
    default:
      return state;
  }
};

const initialState = {
  showCompletedTodos: true, //showCompletedTodos, this controls whether the completed to dos show on the list
  todos: [
    { id: getNextId(), label: "Laundry", complete: true },
    { id: getNextId(), label: "Groceries", complete: false },
    { id: getNextId(), label: "Dishes", complete: false },
  ], //the second slice of state is going to be the to dos themselves, which since we have a todos array above we will copy and paste that into our slice of state instead
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState); //pull state and dispatch from the return value of the reducer hook. and the reducer hook takes a reducer as the first argument, so need to declare the reducer function above this component, and then the second argument of the reducer hook, useReducer, is the initialState so we need to declare that above/outside of this component as well
  const createNewTodo = (label, complete) => {
    const newTodo = { id: getNextId(), label, complete };
    dispatch({ type: ADD_NEW_TODO, payload: newTodo }); //dispatch({}) //and since dispatch comes from the reducer hook we need to import the reducer hook from the react library to then use the dispatch function
  };
  const toggleTodo = (id) => {
    dispatch({ type: TOGGLE_TODO, payload: id });
  };

  const toggleShowCompletedTodos = () => {
    dispatch({ type: TOGGLE_SHOW_COMPLETED_TODOS });
  };

  return (
    <div id="mp">
      <h2>Guided Project</h2>
      <Todos
        todos={state.todos}//this is the array of todos coming from state
        toggleTodo={toggleTodo}//this is the toggle handler that when you click on the todo item will cross it out/mark it with a check to mark as completed
        showCompletedTodos={state.showCompletedTodos}//this is coming from state
        toggleShowCompletedTodos={toggleShowCompletedTodos}//this is the toggle handler that controls the button on the browser of hiding or not hiding the completed todos
      />
      <TodoForm createNewTodo={createNewTodo} />
    </div>
  );
}
