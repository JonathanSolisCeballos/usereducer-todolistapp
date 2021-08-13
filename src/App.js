import react, { useState, useReducer } from "react";

const ACTIONS = {
  ADD_TODO: "add-todo",
  COMPLETE_TODO: "complete-todo",
  DELETE_TODO: "delete-todo",
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
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          console.log(`Eliminando ${todo.id}`);
          return {
            ...todo,
            todos: todo.filter((event) => event._id !== action.payload.id),
          };
        }
        return todo;
      });

    default:
      return todos;
  }
}
// const person = { name: "encix", age: 21 };
// const time = "20/08/2021";

// const obj = {
//   time,
//   person: person.name,
// };

// const todos = [
//   {id:1,name:'hola',completed:false}, //todo
//   {id:2,name:'tarea 2',completed:true},//todo
//   {id:3,name:'tarea 3',completed:false}//todo
// ]

function newTodo(name) {
  console.log("Creando nuevo todo con e nombre de ", name);
  return { id: Date.now(), name: name, completed: false };
}

const initialState = [];

function App() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("ME ENVIE WE");

    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  };

  const handleCompleteTodo = (id) => {
    dispatch({ type: ACTIONS.COMPLETE_TODO, payload: { id: id } });
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: id } });
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
              {todo.name}
              <button onClick={() => handleCompleteTodo(todo.id)}>Done</button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          </>
        );
      })}
    </>
  );
}

export default App;
