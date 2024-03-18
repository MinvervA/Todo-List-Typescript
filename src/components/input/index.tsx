import { IoMdAdd } from "react-icons/io";

import "./InputTodo.css";
import { AddList } from "../AddNote";

type listTodo = {
  id: number;
  task: string;
  description: string;
  date?: string;
};

type handle = {
  // handleSubmit: (task: string, desc: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<listTodo[]>>;
  inputOpen: boolean;
  setInputOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InputTodo: React.FC<handle> = ({ setTodos, inputOpen, setInputOpen }) => {
  // const [inputDesc, setInputDesc] = useState<string>("");

  return (
    <div className="">
      {!inputOpen ? (
        <div
          className="combo-button flex gap-5 items-center transition-all ease-in duration-200"
          onClick={() => setInputOpen(!inputOpen)}
        >
          {/* <div className="rounded-full"> */}
          <IoMdAdd className="logo" size={20} />
          {/* </div> */}
          <p className="">Add Task</p>
        </div>
      ) : (
        <AddList setTodos={setTodos} setInputOpen={setInputOpen} />
      )}
    </div>
  );
};
