import { FaPenToSquare } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { useState } from "react";
import { AddList } from "../AddNote";

type listTodo = {
  id: number;
  task: string;
  description: string;
  date?: string;
};

type handle = {
  setTodos: React.Dispatch<React.SetStateAction<listTodo[]>>;
  setInputOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type listProps = listTodo & handle;

export const List: React.FC<listProps> = ({
  id,
  description,
  task,
  setTodos,
  setInputOpen,
}): JSX.Element => {
  const [edit, setEdit] = useState<boolean>(false);

  const handleDelete = () => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div className="w-full border-b py-2">
      {!edit ? (
        <div className="flex gap-4 items-start">
          <input type="checkbox" name="" id="" className="w-5 h-5 mt-1.5" />
          <div className="w-full ">
            <div className="w-full flex items-center justify-between">
              <div className="task-title text-lg pr-4">{task}</div>
              <div className="flex items-center gap-2">
                <FaPenToSquare className="hover:text-blue-500" onClick={() => setEdit(!edit)} />
                <IoTrashOutline className="hover:text-red-500" onClick={() => handleDelete()} />
              </div>
            </div>
            <div className="task-description text-sm font-light w-full overflow-hidden truncate pr-9">
              {description}
            </div>
          </div>
        </div>
      ) : (
        <AddList
          setTodos={setTodos}
          setInputOpen={setInputOpen}
          defaultValue={{ id, task, description, setEdit }}
        />
      )}
    </div>
  );
};
