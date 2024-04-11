"use client";

import { memo, useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Position } from "@/app/constants";
import { useTasksStore } from "@/app/store";

export type TaskItemProps = {
  id: number;
  task: string;
  position: Position;
};

const TaskItem = memo(function TaskItem({ id, task, position }: TaskItemProps) {
  const taskItemRef = useRef<HTMLDivElement | null>(null);
  const [isDragged, setIsDragged] = useState<boolean>(false);
  const removeTaskById = useTasksStore((state) => state.removeTaskById);

  useEffect(() => {
    const element = taskItemRef.current;

    if (!element) {
      throw new Error("task item ref not setup correctly");
    }

    return draggable({
      element: element,
      getInitialData: () => ({
        id,
        task,
        position,
      }),
      onDragStart: () => setIsDragged(true),
      onDrop: () => setIsDragged(false),
    });
  }, [id, position, task]);

  return (
    <div
      ref={taskItemRef}
      className={`border-list border px-4 mx-4 rounded-[8px] py-2 text-[14px] shadow-md cursor-pointer flex justify-between ${isDragged ? "opacity-50" : ""}`}
    >
      <h3 className={"mr-4 text-justify"}>{task}</h3>
      <span
        className={" h-fit text-red-500  cursor-pointer"}
        onClick={() => removeTaskById(id)}
      >
        x
      </span>
    </div>
  );
});

export default TaskItem;
