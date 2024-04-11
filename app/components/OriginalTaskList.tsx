import { Position } from "@/app/constants";
import TaskItem from "@/app/components/TaskItem";
import { useTasksStore } from "@/app/store";

export const TaskList = ({ children }: { children: any }) => {
  return <div className={"gap-2 flex flex-col"}>{children}</div>;
};

const OrginalTaskList = () => {
  const tasks = useTasksStore((state) => state.tasks);

  return (
    <div className={"my-8"}>
      <TaskList>
        {tasks
          ?.filter((taskItem) => taskItem.position === Position.ORIGINAL)
          .map(({ id, task, position }, idx) => (
            <TaskItem key={id} id={id} task={task} position={position} />
          ))}
      </TaskList>
    </div>
  );
};

export default OrginalTaskList;
