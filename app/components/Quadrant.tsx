import { memo, useEffect, useRef, useState } from "react";
import TaskItem from "@/app/components/TaskItem";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Position } from "@/app/constants";
import { TaskList } from "@/app/components/OriginalTaskList";
import { useTasksStore } from "@/app/store";

export type QuadrantProps = {
  id: number;
  name: string;
  position: Position;
};

const Quadrant = memo(function Quadrant({ name, position }: QuadrantProps) {
  const quadrantRef = useRef<HTMLDivElement | null>(null);
  const tasks = useTasksStore((state) => state.tasks);
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
      onDrop: ({ source }) => setIsBeingDraggedOver(false),
    });
  }, [position]);

  const getBgColor = () => {
    const value = 200;

    switch (position) {
      case Position.URGENT_IMPORTANT:
        return `bg-green-${value}`;
      case Position.NOT_URGENT_IMPORTANT:
        return `bg-blue-${value}`;
      case Position.NOT_URGENT_NOT_IMPORTANT:
        return `bg-red-${value}`;
      case Position.URGENT_NOT_IMPORTANT:
        return `bg-yellow-${value}`;
    }
  };

  return (
    <div
      ref={quadrantRef}
      className={`w-full rounded-[20px] px-2 pt-2 pb-4 border transition-all duration-500 ${isBeingDraggedOver && getBgColor()}`}
    >
      <h3 className={`font-semibold text-md mb-4 text-center text-gray-800`}>
        {name}
      </h3>

      <TaskList>
        {tasks
          ?.filter((taskItem) => taskItem.position === position)
          ?.map(({ id, task }) => (
            <TaskItem key={id} id={id} task={task} position={position} />
          ))}
      </TaskList>
    </div>
  );
});

export default Quadrant;
