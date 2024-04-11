"use client";

import { useCallback, useEffect, useMemo } from "react";
import { TaskItemProps } from "@/app/components/TaskItem";
import Matrix from "@/app/components/Matrix";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Position } from "@/app/constants";
import OriginalTaskList from "@/app/components/OriginalTaskList";
import TaskInput from "@/app/components/TaskInput";
import { useTasksStore } from "@/app/store";

export default function Home() {
  const tasks = useTasksStore((state) => state.tasks);
  const setTasks = useTasksStore((state) => state.setTasks);

  const quadrantPositions = useMemo(
    () => [
      Position.URGENT_IMPORTANT,
      Position.URGENT_NOT_IMPORTANT,
      Position.NOT_URGENT_IMPORTANT,
      Position.NOT_URGENT_NOT_IMPORTANT,
    ],
    [],
  );

  const isQuadrantPosition = useCallback(
    (position: Position) => {
      return quadrantPositions.includes(position);
    },
    [quadrantPositions],
  );

  useEffect(() => {
    return monitorForElements({
      onDrop: ({ source, location }) => {
        const draggedTaskData = source.data as TaskItemProps;

        const destination = location.current.dropTargets[0];
        if (!destination) return;

        const destinationPosition = destination.data.position as Position;

        if (!isQuadrantPosition(destinationPosition)) return;

        const draggedTask = tasks.find(
          (taskItem) => taskItem.id === draggedTaskData.id,
        ) as unknown as TaskItemProps;

        const otherTasks = tasks.filter((task) => task != draggedTask);

        setTasks([
          {
            id: draggedTask.id,
            task: draggedTask.task,
            position: destinationPosition,
          },
          ...otherTasks,
        ]);
      },
    });
  }, [isQuadrantPosition, setTasks, tasks]);

  return (
    <main className="mx-4">
      <div className={"py-4 flex border-b mb-4"}>
        <h1 className={"font-semibold text-lg cursor-pointer"}>
          NotAnotherTodoApp
        </h1>
      </div>

      <div className={"flex gap-4"}>
        {/* This will contain the inputs and the task lists */}
        <div className={"w-[500px]"}>
          <TaskInput />
          <OriginalTaskList />
        </div>

        {/*  This section will have the droppable quadrants */}
        <Matrix />
      </div>
    </main>
  );
}
