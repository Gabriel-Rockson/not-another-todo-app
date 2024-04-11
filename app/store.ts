import { create } from "zustand";
import { TaskItemProps } from "@/app/components/TaskItem";

type TasksStore = {
  task: string;
  tasks: TaskItemProps[];
  setTask: (taskInput: string) => void;
  addTask: (task: TaskItemProps) => void;
  removeTaskById: (taskId: number) => void;
  setTasks: (tasks: TaskItemProps[]) => void;
};

const useStore = create<TasksStore>()((set) => ({
  task: "",
  tasks: [],
  setTask: (task: string) => set((state) => ({ ...state, task: task })),
  addTask: (task: TaskItemProps) =>
    set((state) => ({ ...state, tasks: [task, ...state.tasks] })),
  removeTaskById: (taskId: number) =>
    set((state) => ({
      ...state,
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  setTasks: (tasks: TaskItemProps[]) =>
    set((state) => ({ ...state, tasks: tasks })),
}));

export const useTasksStore = useStore;
