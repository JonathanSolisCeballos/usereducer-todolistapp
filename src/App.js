import { useState, useReducer } from "react";

const ACTIONS = {
  ADD_TODO: "add-todo",
  COMPLETE_TODO: "complete-todo",
  DELETE_TODO: "delete-todo",
  EDIT_TODO: "edit-todo",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];

    case ACTIONS.COMPLETE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: true };
        }
        return todo;
      });

    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);

    case ACTIONS.EDIT_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, name: action.payload.name };
        }
        return todo;
      });

    default:
      return todos;
  }
}

function newTodo(name) {
  console.log("Creando nuevo todo con e nombre de ", name);
  return { id: Date.now(), name: name, completed: false };
}

const initialState = [];

function App() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");

  const [todoEditId, setTodoEditId] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "" || null) {
      dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
      setName("");
    }
  };

  const handleCompleteTodo = (id) => {
    dispatch({ type: ACTIONS.COMPLETE_TODO, payload: { id: id } });
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: id } });
  };

  const handleEditTodo = (id, name) => {
    setTodoEditId(id);
    setNewName(name);
  };

  const handleOkEditTodo = (id) => {
    setTodoEditId(1);

    dispatch({ type: ACTIONS.EDIT_TODO, payload: { id: id, name: newName } });
  };

  console.log(todos);
  return (
    <>
      <h1>Use Reducer Todo List App Example</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New task..."
        />
      </form>
      {todos.map((todo, index) => {
        return (
          <>
            <li
              key={index}
              style={{
                color: todo.completed ? "#4caf50" : "#000000",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todoEditId !== todo.id ? (
                <>
                  {todo.name}
                  <button onClick={() => handleCompleteTodo(todo.id)}>
                    🟢
                  </button>
                  <button onClick={() => handleDeleteTodo(todo.id)}>⛔</button>
                  <button onClick={() => handleEditTodo(todo.id, todo.name)}>
                    ✍
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="New task..."
                  />
                  <button onClick={() => handleOkEditTodo(todo.id)}>Ok</button>
                </>
              )}
            </li>
          </>
        );
      })}
    </>
  );
}

export default App;
