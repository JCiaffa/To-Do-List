import React, { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    //setTodos and pass in a brand new array containing all current values plus one more
    if (newTodo.length == 0) {
      return;
    }

    const todoItem = {
      text: newTodo,
      complete: false,
    };

    setTodos([...todos, todoItem]);
    setNewTodo("");
  };

  const handleTodoDelete = (delIdx) => {
    const filteredTodos = todos.filter((todo, i) => {
      return i != delIdx;
    });

    setTodos(filteredTodos);
  };

  const handleToggleComplete = (idx) => {
    const updatedTodos = todos.map((todo, i) => {
      if (idx == i) {
        todo.complete = !todo.complete;
        // to avoid mutating the todo directly do this
        // const updatedTodo = { ...todo, complete: !todo.complete };
        // return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleNewTodoSubmit(event);
        }}
      >
        <input
          onChange={(event) => {
            setNewTodo(event.target.value);
          }}
          type="text"
          value={newTodo}
        />
        <div>
          <button>Add</button>
        </div>
      </form>

      {todos.map((todo, i) => {
        return (
          <Todo
            todo={todo}
            key={i}
            i={i}
            handleToggleComplete={handleToggleComplete}
            handleTodoDelete={handleTodoDelete}
          />
        );
      })}
    </div>
  );
}

export default App;
