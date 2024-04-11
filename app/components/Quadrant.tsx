import { memo, useContext, useEffect, useRef, useState } from "react";
import TaskItem, { TaskItemProps } from "@/app/components/TaskItem";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Position } from "@/app/constants";

import { TaskContext } from "@/app/contexts";
import { TaskList } from "@/app/components/OriginalTaskList";

export type QuadrantProps = {
  id: number;
  name: string;
  position: Position;
};

const Quadrant = memo(function Quadrant({ name, position }: QuadrantProps) {
  const quadrantRef = useRef<HTMLDivElement | null>(null);
  const tasks = useContext(TaskContext);
  const [isBeingDraggedOver, setIsBeingDraggedOver] = useState<boolean>(false);

  useEffect(() => {
    const element = quadrantRef.current;

    if (!element) {
      throw new Error("quadrant ref not set up correctly");
    }

    return dropTargetForElements({
      element: element,
      getData: () => ({
        position: position,
      }),
      onDragEnter: () => setIsBeingDraggedOver(true),
      onDragLeave: () => setIsBeingDraggedOver(false),
      onDrop: ({ source }) => {
        const data = source.data as TaskItemProps;
        setIsBeingDraggedOver(false);
      },
    });
  }, [position]);

  return (
    <div
      ref={quadrantRef}
      className={`${isBeingDraggedOver ? "bg-gray-200" : "bg-gray-50"} w-full rounded-[20px] px-2 py-4 border`}
    >
      <h3 className={"font-semibold text-lg mb-4 text-center text-gray-900"}>
        {name}
      </h3>

      <TaskList>
        {tasks
          ?.filter((taskItem) => taskItem.position === position)
          ?.map(({ task }, idx) => (
            <TaskItem key={idx} task={task} position={position} />
          ))}
      </TaskList>
    </div>
  );
});

export default Quadrant;
