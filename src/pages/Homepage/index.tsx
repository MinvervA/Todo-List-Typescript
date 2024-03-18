import { useEffect, useState } from "react";
import { List } from "../../components/List";
import { InputTodo } from "../../components/input";

type listTodo = {
  id: number;
  task: string;
  description: string;
  date?: string;
};

const restoredData = localStorage.getItem("react-todo-data");

export const Todo: React.FC = () => {
  const [inputOpen, setInputOpen] = useState<boolean>(false);
  const [todos, setTodos] = useState<listTodo[]>(
    // { id: 1, task: "Belajar Coding", description: "Harus membuat sebuah Todo List dalam react" },
    // { id: 2, task: "Belajar masak", description: "Harus membuat sebuah Todo List dalam react" },
    // {
    //   id: 3,
    //   task: "Belajar matematika",
    //   description: "Harus membuat sebuah Todo List dalam react",
    // },
    () => {
      return restoredData ? JSON.parse(restoredData) : [];
    }
  );

  useEffect(() => {
    localStorage.setItem("react-todo-data", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="h-dvh">
      <div className="h-[48px] flex items-center px-9 shadow-md">
        <p className="font-bold text-xl">Todo</p>
      </div>
      <div className="px-9">
        <div className="text-lg font-semibold mt-8">Things todo :</div>
        <div className="">
          {todos.map((item) => (
            <List key={item.id} {...item} setTodos={setTodos} setInputOpen={setInputOpen} />
          ))}
        </div>
        <div className="py-2">
          <InputTodo inputOpen={inputOpen} setInputOpen={setInputOpen} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
};
