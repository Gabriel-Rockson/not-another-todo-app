import { createContext } from "react";
import { TaskItemProps } from "@/app/components/TaskItem";

export const TaskContext = createContext<TaskItemProps[]>([]);
