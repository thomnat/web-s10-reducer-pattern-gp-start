import React, { useReducer } from "react";

const CHANGE_LABEL = "CHANGE_LABEL";
const CHANGE_IS_COMPLETED = "CHANGE_IS_COMPLETED";

const initialState = {
  todoLabel: "",
  todoIsCompleted: false,
};

//Question: how is the reducer hook superior to the state hook? The advantage lies in that all this state altering logic has been removed from a component and centralized inside a single function aka reducer. the component itself becomes pretty simple, all that the event handlers are doing is dispatching actions and no state recalculation at all. the state recalculation is the responsibility of the reducer. in this specific example the reducer might be overkill when we only have two slices of state, but imagine you are dealing with a component that had 15 slices of state with 30 types of actions that could be dispatched to change that state - it would be a good idea then to have all the state changing logic centralized in a single place aka in the reducer.
const reducer = (state, action) => {
  switch (
    action.type //creating a switch on the action type. meaning depending on the value of the type of the action, we will change state in one way or another.
  ) {
    case CHANGE_LABEL: //in the case where the action.type is CHANGE_LABEL
      return { ...state, todoLabel: action.payload }; //another rule of reducers is we never mutate the state object, so if a CHANGE_LABEL action gets dispatched we are going to return a brand new object where we spread out the existing state properties and then make any override we desire using the information from the payload, in this case changing the todoLabel is going to have a value equal to action.payload
    case CHANGE_IS_COMPLETED: //{ type: CHANGE_IS_COMPLETED, payload: true }
      return { ...state, todoIsCompleted: action.payload };
    default: //a default case where the action.type is not matching any of the cases above
      return state; //one import rule of reducers is that we always return state, so the default will always return the state unchanged
  }
}; //a reducer is a function that takes state and an action and returns new state.
//state, which the reducer takes as its first argument is going to be an object like our initialState object, and the action, which the reducer takes as its second argument, is going to be an object looking like this: { type: CHANGE_LABEL, payload: 'foo' }. its going to have a type property which is going to match one of our initialized actions above, and then a payload which is the information needed to compute the next state, looking like the value of the payload in this case being 'foo'
//if the action dispatched is of type CHANGE_LABEL then 'foo' will be the next value of the input

export default function TodoForm({ createNewTodo }) {
  //so now we are going to imagine that the component is receiving a prop called createNewTodo (and since it is a prop that means this function is coming from a parent component aka the App component) and this prop will be used inside the submit handler
  const [state, dispatch] = useReducer(reducer, initialState); //at the very top of our component we will declare two variables - state and dispatch, which are the first and second elements in an array that returns from calling use reducer and in our useReducer we pass in our reducer as our first argument and the initialState as the second argument. if you go into the browser and inspect the components and look at the todoForm component, you will find a hook there called Reducer which contains the state of the component - an object with a property todoLabel and another property todoIsCompleted. so our component is tracking its state now using a reducer

  //now lets declare three state changing functions
  const onLabelChange = ({ target: { value } }) => {
    //using destructuring to grab the value property from the target of the synthetic object to use in our dispatch function instead of writing payload: evt.target.value and the onLabelChange taking in an evt
    dispatch({ type: CHANGE_LABEL, payload: value }); //we have to call our dispatch() function that we got from our reducer hook and the argument the dispatch function takes is an action and an action is an object with a type property, in this case of CHANGE_LABEL and a property called payload with a value of evt.target.value (which the evt.target.value is from when you inspect the synthetic evt object with debugger to see when you change the value of the input box and see where that value was stored in the synthentic event object which its stored in the event object under the target property which contains a value property holding the value you typed into the box aka located at evt.target.value)
    //debugger - you would use debugger inside this handler before adding the dispatch function to inspect where the input text is being stored in the synthetic event object on change
  }; //onLabelChange is an event handler thatll be wired to the input
  const onIsCompletedChange = ({ target: { checked } }) => {
    dispatch({ type: CHANGE_IS_COMPLETED, payload: checked });
  }; //will be wired as the change handler for the checkbox
  const resetForm = () => {
    dispatch({ type: CHANGE_LABEL, payload: "" });
    dispatch({ type: CHANGE_IS_COMPLETED, payload: false });
  }; //will be used as part of submit. on submit, resetting the form is going to be a matter of resetting the input box to be an empty string and the checked box to be unchecked aka false

  const onNewTodo = (evt) => {
    //in order to use reset form, we need to create a new function called onNewTodo which is going to be our submit handler. so on the form element in the JSX we will create an onSubmit prop which will point to onNewTodo
    evt.preventDefault(); //so the page doesnt refresh on submit
    createNewTodo(state.todoLabel, state.todoIsCompleted); //this is the prop we passed into the TodoForm component above that is coming from the parent component App. so since this is our submit handler, that means when we click the Do It button in the browser, we will be calling this createNewTodo function and we are passing as the first argument the desired todoLabel and as the second argument the desired completeness status (and we have already passed this into the form element as onSubmit={onNewTodo})
    resetForm(); //calling our resetForm function above to return the input text and the chechbox back to an empty string and an unchecked box aka false
  };

  return (
    <form id="todoForm" onSubmit={onNewTodo}>
      <h3>New Todo Form</h3>
      <label>
        <span>Todo label:</span>
        <input
          onChange={onLabelChange} //the handler to change the state of the input
          value={state.todoLabel} //there are a few pieces of our interface that need to drink from state. the text input is going to have a value prop pointing to state.todoLabel
          type="text"
          name="todoLabel"
          placeholder="Type label"
        />
      </label>
      <label>
        <span>Is completed:</span>
        <input
          onChange={onIsCompletedChange} //the handler to change the state of the checkbox
          checked={state.todoIsCompleted} //and the chechbox is going to have a checked prop that is pointing to state.changeIsCompleted. so now we have given our component all the weapons it needs to change its own internal state
          type="checkbox"
          name="todoIsCompleted"
        />
      </label>
      <label>
        <span>Create todo:</span>
        <input type="submit" value="Do it!" />
      </label>
    </form>
  );
}
