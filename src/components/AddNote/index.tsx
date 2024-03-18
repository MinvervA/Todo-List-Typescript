import { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
type listTodo = {
  id: number;
  task: string;
  description: string;
  date?: string;
};

type handle = {
  // handleSubmit: (task: string, desc: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<listTodo[]>>;
  setInputOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type AddlistProps = handle & {
  defaultValue?: {
    id: number;
    task: string;
    description: string;
    date?: string;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export const AddList: React.FC<AddlistProps> = ({ setTodos, setInputOpen, defaultValue }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [desc, setDesc] = useState<string>(defaultValue?.description || "");
  const [inputTask, setInputTask] = useState<string>(defaultValue?.task || "");
  const [inputDate, setInputDate] = useState<string>(defaultValue?.date || "");

  const handleSubmit = () => {
    if (inputTask.trim().length > 0) {
      console.log(inputTask);
      console.log(desc);
      const newTodo: listTodo = {
        id: Date.now(),
        task: inputTask,
        description: desc,
        date: inputDate,
      };
      setTodos((prev) => [...prev, newTodo]);
      setInputTask("");
      setDesc("");
      setInputOpen((prev) => !prev);
    } else {
      alert("Add some Value!");
    }
  };

  const handleEdit = () => {
    console.log("disana???");

    // Mengubah nilai todo dengan ID yang sesuai
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === defaultValue?.id) {
          console.log("berhasil");
          defaultValue?.setEdit(false);
          return {
            ...todo,
            task: inputTask,
            description: desc,
            date: inputDate,
          };
        } else {
          return todo;
        }
      })
    );
  };

  useEffect(() => {
    console.log(defaultValue?.id);

    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, [desc]);
  return (
    <div>
      <div className="w-full border border-black rounded-md transition ease-in duration-300">
        <div className="">
          <div className="px-3 py-2">
            <input
              type="text"
              placeholder="Task name"
              value={inputTask}
              onChange={(e) => setInputTask(e.target.value)}
              className="outline-none w-full font-medium"
            />
            <textarea
              name=""
              id=""
              rows={1}
              ref={textAreaRef}
              placeholder="description"
              className="mt-1 outline-none w-full placeholder:text-sm resize-none overflow-auto overflow-y-scroll no-scrollbar text-sm font-light"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="mt-5 border-t border-black px-3 py-2 flex justify-between">
            <div className="">
              <input
                type="date"
                name=""
                id=""
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div
                className="bg-black text-white font-semibold p-1 rounded-[4px] flex justify-center items-center cursor-pointer"
                onClick={
                  // defaultValue?.task ? () => defaultValue.setEdit(false) : () => console.log("test")
                  () => {
                    if (defaultValue?.task) {
                      defaultValue.setEdit((prev) => !prev);
                    } else {
                      setInputOpen(false);
                      console.log(">>>");
                    }
                  }
                  // () => setInputOpen((prev) => !prev)
                }
              >
                <RxCross1 size={15} />
              </div>
              <button
                className="bg-red-600 text-white font-semibold p-1 rounded-[4px] flex justify-center items-center cursor-pointer"
                onClick={() => {
                  if (defaultValue?.task) {
                    handleEdit();
                    console.log(">>>");
                  } else {
                    handleSubmit();
                  }
                }}
              >
                <IoMdSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
