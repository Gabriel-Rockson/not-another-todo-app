"use client";

import { memo, useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Position } from "@/app/constants";

export type TaskItemProps = {
  task: string;
  position?: Position;
};

const TaskItem = memo(function TaskItem({ task, position }: TaskItemProps) {
  const taskItemRef = useRef<HTMLDivElement | null>(null);
  const [isDragged, setIsDragged] = useState<boolean>(false);

  useEffect(() => {
    const element = taskItemRef.current;

    if (!element) {
      throw new Error("task item ref not setup correctly");
    }

    return draggable({
      element: element,
      getInitialData: () => ({
        task,
        position,
      }),
      onDragStart: () => setIsDragged(true),
      onDrop: () => setIsDragged(false),
    });
  }, [position, task]);

  return (
    <div
      ref={taskItemRef}
      className={`border-list border px-4 mx-4 rounded-[8px] py-2 text-[14px] shadow-md cursor-pointer ${isDragged ? "opacity-50" : ""}`}
    >
      {task}
    </div>
  );
});

export default TaskItem;
