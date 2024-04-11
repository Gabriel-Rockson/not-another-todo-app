import { useTasksStore } from "@/app/store";
import { Position } from "@/app/constants";
import { useCallback } from "react";
import { TaskItemProps } from "@/app/components/TaskItem";

type PrioritySectionProps = {
  heading: string;
  tasks: TaskItemProps[];
};

const PrioritySection = ({ heading, tasks }: PrioritySectionProps) => {
  return (
    <div className={"flex flex-col gap-2"}>
      <h3 className={"font-semibold text-gray-600"}>{heading}</h3>
      {tasks?.map((taskItem) => <p key={taskItem.id}>{taskItem?.task}</p>)}
    </div>
  );
};

const PrioritizedList = () => {
  const tasks = useTasksStore((state) => state.tasks);

  const getSectionTasks = useCallback(
    (position: Position) => {
      return tasks?.filter((taskItem) => taskItem.position === position);
    },
    [tasks],
  );

  const mostImportantTask = getSectionTasks(Position.URGENT_IMPORTANT)[0];

  const prioritizedSections: PrioritySectionProps[] = [
    {
      heading: "Tasks you need to attack right after your topmost task",
      tasks: getSectionTasks(Position.URGENT_IMPORTANT)?.slice(1),
    },
    {
      heading: "Tasks that you should schedule, they seem pretty important",
      tasks: getSectionTasks(Position.NOT_URGENT_IMPORTANT),
    },
    {
      heading: "Tasks you should delegate",
      tasks: getSectionTasks(Position.URGENT_NOT_IMPORTANT),
    },
    {
      heading: "Tasks that don't benefit you in anyway, DELETE them",
      tasks: getSectionTasks(Position.NOT_URGENT_NOT_IMPORTANT),
    },
  ];

  return (
    <div className={"transition-all duration-500"}>
      <h3 className={"text-gray-800 font-semibold text-center mb-4 text-lg"}>
        Your prioritized list
      </h3>

      <div
        className={"bg-gray-700 shadow-md rounded-[20px] p-4 mb-10 text-white"}
      >
        <h3 className={"font-semibold text-gray-200 mb-2"}>
          Your topmost priority{" "}
        </h3>
        <p>- {mostImportantTask?.task}</p>
      </div>

      <div className={"flex flex-col gap-10"}>
        {prioritizedSections?.map(({ heading, tasks }) => {
          return (
            tasks.length > 0 && (
              <PrioritySection heading={heading} tasks={tasks} />
            )
          );
        })}
      </div>
    </div>
  );
};

export default PrioritizedList;
