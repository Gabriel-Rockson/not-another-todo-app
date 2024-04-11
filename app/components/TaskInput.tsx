import { useTasksStore } from "@/app/store";
import { Position } from "@/app/constants";

const TaskInput = () => {
  // const { setTasks } = useContext(TaskContext);
  const task = useTasksStore((state) => state.task);
  const setTask = useTasksStore((state) => state.setTask);
  const addTask = useTasksStore((state) => state.addTask);

  const handleInput = () => {
    addTask({
      id: new Date().getTime(),
      task: task,
      position: Position.ORIGINAL,
    });

    setTask("");
  };

  return (
    <div
      className={
        "flex flex-col gap-8 px-4 py-6 rounded-[20px] border shadow-sm"
      }
    >
      <textarea
        placeholder={"What task is bothering you?"}
        className={
          "border px-4 rounded-[20px] h-[134px] py-2 text-[14px] focus:outline-none  border-gray-300 focus:border-2"
        }
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />

      <button
        className={
          "self-end bg-[#333333] py-2 px-6 rounded-[20px] text-white font-semibold text-[14px]"
        }
        onClick={handleInput}
      >
        Add new task
      </button>
    </div>
  );
};

export default TaskInput;
