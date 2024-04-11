"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { TaskItemProps } from "@/app/components/TaskItem";
import Matrix from "@/app/components/Matrix";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Position } from "@/app/constants";
import OriginalTaskList from "@/app/components/OriginalTaskList";
import { TaskContext } from "@/app/contexts";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<TaskItemProps[]>([]);

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
        // Get the destination, if there's no destination, return
        // Get the actual destination position, and the source position
        // If the destination position is not any of the four quadrants, return
        // If the source position is not any of the five original locations, return
        const destination = location.current.dropTargets[0];
        if (!destination) return;

        const sourcePosition = source.data.position as Position;
        const destinationPosition = destination.data.position as Position;

        if (!isQuadrantPosition(destinationPosition)) return;

        const draggedTask = tasks.find(
          (taskItem) => taskItem.task === source.data.task,
        ) as unknown as TaskItemProps;
        const otherTasks = tasks.filter((task) => task != draggedTask);

        setTasks([
          { task: draggedTask.task, position: destinationPosition },
          ...otherTasks,
        ]);
      },
    });
  }, [isQuadrantPosition, tasks]);

  const handleAddTask = () => {
    setTasks((prevState) => [
      {
        task: task.trim(),
        position: Position.ORIGINAL,
      },
      ...prevState,
    ]);
    setTask("");
  };

  return (
    <main className="mx-4">
      <div className={"py-8"}>
        <h1 className={"font-semibold text-center text-2xl"}>
          NotAnotherTodoApp
        </h1>
      </div>

      <TaskContext.Provider value={tasks}>
        <div className={"flex gap-4"}>
          {/* This will contain the inputs and the task lists */}
          <div className={"w-[500px]"}>
            <div
              className={
                "flex flex-col gap-8 bg-input-area px-4 py-6 rounded-[20px]"
              }
            >
              <textarea
                placeholder={"What task is bothering you?"}
                className={
                  "border-[#333333] border px-4 rounded-[20px] h-[134px] py-2 text-[14px] focus:outline-none  border-b-gray-600"
                }
                value={task}
                onChange={(event) => setTask(event.target.value)}
              />

              <button
                className={
                  "self-end bg-[#333333] py-2 px-6 rounded-[20px] text-white font-semibold text-[14px]"
                }
                onClick={handleAddTask}
              >
                Add new task
              </button>
            </div>

            <OriginalTaskList />
          </div>

          {/*  This section will have the droppable quadrants */}
          <Matrix />
        </div>
      </TaskContext.Provider>
    </main>
  );
}
