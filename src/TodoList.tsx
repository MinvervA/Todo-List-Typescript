import { useState } from "react";

type listTodo = {
  id: number;
  task: string;
  completed: boolean;
};
export function TodoList() {
  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<listTodo[]>([
    { id: 1, task: "Learn Typescript", completed: false },
    { id: 2, task: "get the job", completed: false },
  ]);

  const handleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    const newTodo: listTodo = { id: Date.now(), task: input, completed: false };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">TodoList</h1>
      <form className="todo-form" onSubmit={(e) => handleSubmit(e)}>
        <input
          className="todo-input"
          type="text"
          placeholder="Add todo item"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="todo-button" type="submit">
          Submit
        </button>
      </form>
      <ol className="todo-group">
        {todos.map((todo) => (
          <li
            className={`todo-list ${todo.completed && "completed"}`}
            key={todo.id}
            onClick={() => handleCompleted(todo.id)}
          >
            {todo.task}
          </li>
        ))}
        {/* <li className="todo-list">item 1</li>
        <li className="todo-list">item 2</li> */}
      </ol>
    </div>
  );
}
