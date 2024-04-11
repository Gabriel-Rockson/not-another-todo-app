import { Position } from "@/app/constants";
import TaskItem from "@/app/components/TaskItem";
import { useContext } from "react";

import { TaskContext } from "@/app/contexts";

export const TaskList = ({ children }: { children: any }) => {
  return <div className={"gap-2 flex flex-col"}>{children}</div>;
};

const OrginalTaskList = () => {
  const tasks = useContext(TaskContext);

  return (
    <div className={"my-8"}>
      <TaskList>
        {tasks
          ?.filter((taskItem) => taskItem.position === Position.ORIGINAL)
          .map(({ task, position }, idx) => (
            <TaskItem key={idx} task={task} position={position} />
          ))}
      </TaskList>
    </div>
  );
};

export default OrginalTaskList;
