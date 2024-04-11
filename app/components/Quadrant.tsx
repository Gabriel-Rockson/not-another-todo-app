import { memo, useEffect, useMemo, useRef, useState } from "react";
import TaskItem from "@/app/components/TaskItem";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Position } from "@/app/constants";
import { TaskList } from "@/app/components/OriginalTaskList";
import { useTasksStore } from "@/app/store";

export type QuadrantProps = {
  id: number;
  urgent: boolean;
  important: boolean;
  position: Position;
};

const QuadrantHeading = ({ children }: { children: any }) => {
  return (
    <h3 className={`font-semibold text-md mb-4 text-center text-gray-800`}>
      {children}
    </h3>
  );
};

const Quadrant = memo(function Quadrant({
  position,
  urgent,
  important,
}: QuadrantProps) {
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
      onDrop: () => setIsBeingDraggedOver(false),
    });
  }, [position]);

  // FIXME the background color on hover doesn't work
  const getBgColor = useMemo(() => {
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
  }, [position]);

  const QuadrantName = memo(function QuadrantName() {
    const conjunctions = ["and", "but"];

    if (urgent && important) {
      return (
        <QuadrantHeading>
          Urgent <span className="text-green-600">AND</span> important
        </QuadrantHeading>
      );
    }

    if (urgent && !important) {
      return (
        <QuadrantHeading>
          Urgent <span className={"text-yellow-600"}>BUT</span> Not Important
        </QuadrantHeading>
      );
    }

    if (!urgent && important) {
      return (
        <QuadrantHeading>
          Not Urgent <span className={"text-blue-600"}>BUT</span> Important
        </QuadrantHeading>
      );
    }

    if (!urgent && !important) {
      return (
        <QuadrantHeading>
          Not Urgent <span className={"text-red-600"}>AND</span> Not Important
        </QuadrantHeading>
      );
    }
  });

  return (
    <div
      ref={quadrantRef}
      className={`${isBeingDraggedOver ? getBgColor : ""} w-full rounded-[20px] px-2 pt-2 pb-4 border transition-all duration-500 `}
    >
      <QuadrantName />

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
