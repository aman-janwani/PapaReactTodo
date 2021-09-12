import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
} from "@heroicons/react/outline";
import { v4 } from "uuid";
import FlipMove from "react-flip-move";
import useLocalStorage from "../hooks/useLocalStorage";
import { forwardRef, useEffect, useState } from "react";
import "./todos.css";

const Todos = forwardRef(() => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useLocalStorage("todos", []);

  useEffect(() => {
    const addLocal = () => {
      if (todos.length > 0) {
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    };
    addLocal();
  }, [todos]);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (todo.length === 0) return;
    setTodos([...todos, { text: todo, key: v4(), complete: false }]);
    setTodo("");
  };
  const deleteTodo = (e, key) => {
    e.preventDefault();
    let newTodos = todos.filter((todo) => todo.key !== key);
    setTodos(newTodos);
  };
  const editTodo = (e, key) => {
    e.preventDefault();
    todos.forEach((todo) => {
      if (todo.key === key) {
        setTodo(todo.text);
      }
    });
    let newTodos = todos.filter((todo) => todo.key !== key);
    setTodos(newTodos);
  };
  const completeTodo = (e, key) => {
    e.preventDefault();
    todos.forEach((todo) => {
      if (todo.key === key) {
        todo.complete = true;
      }
    });
    setTodos([...todos]);
  };
  return (
    <div className="todos">
      <form className="todos__form">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="todos__input"
          placeholder="Enter Your Todo"
        />
        <button type="submit" className="todos__submit" onClick={handelSubmit}>
          <PlusIcon className="todos__submit--icon" />
        </button>
      </form>
      <div className="todos__list">
        <FlipMove>
          {todos.map((todo, i) => (
            <div className="todo">
              {todo.complete === true ? (
                <div className="todo__completed">
                  <h3 className="todo__text--completed todo__text">
                    {todo.text}
                  </h3>
                  <TrashIcon
                    className="todo__delete--icon todo__icon"
                    onClick={(e) => deleteTodo(e, todo.key)}
                  />
                </div>
              ) : (
                <div className="todo__incompleted">
                  <h3 className="todo__text">{todo.text}</h3>
                  <div className="todo__icons">
                    <CheckIcon
                      className="todo__complete--icon todo__icon"
                      onClick={(e) => completeTodo(e, todo.key)}
                    />
                    <PencilIcon
                      className="todo__edit--icon todo__icon"
                      onClick={(e) => editTodo(e, todo.key)}
                    />
                    <TrashIcon
                      className="todo__delete--icon todo__icon"
                      onClick={(e) => deleteTodo(e, todo.key)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </FlipMove>
      </div>
    </div>
  );
});

export default Todos;
