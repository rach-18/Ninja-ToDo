import { useState } from "react";
import TaskCard from "./TaskCard";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useTask } from "../../context/TaskContext";

function Tasks() {
  const { tasks, priorityOrder } = useTask();

  const sortedPriorities = Object.keys(tasks).sort(
    (a, b) => priorityOrder[a] - priorityOrder[b]
  );

  return (
    <div className="w-full bg-[#F9FAFC] p-5 border-2 general-shadow rounded-lg border-blue-300 mt-10">
      <p className="text-center font-bold text-3xl mb-5">Ninja Tasks</p>
      {Object.keys(tasks).length === 0 ? (
        <p className="text-indigo-300 text-center">
          Your ninja tasks will go here - make them count! 🎯
        </p>
      ) : (
        <div className="flex gap-5 flex-wrap justify-center">
          {sortedPriorities.map((priority) => {
            const taskList = tasks[priority];
            let props;

            switch (priority) {
              case "Important & Urgent":
                props = {
                  border: "border-red-300",
                  tag: "bg-red-300",
                  bg: "bg-red-50",
                  shadow: "red-shadow",
                  title: "Do",
                  icon: <BoltOutlinedIcon />,
                };
                break;
              case "Important & Not Urgent":
                props = {
                  border: "border-blue-300",
                  tag: "bg-blue-300",
                  bg: "bg-blue-50",
                  shadow: "blue-shadow",
                  title: "Schedule",
                  icon: <PlayArrowOutlinedIcon />,
                };
                break;
              case "Not Important & Urgent":
                props = {
                  border: "border-yellow-300",
                  tag: "bg-yellow-300",
                  bg: "bg-yellow-50",
                  shadow: "yellow-shadow",
                  title: "Delegate",
                  icon: <CheckCircleOutlinedIcon />,
                };
                break;
              case "Not Important & Not Urgent":
                props = {
                  border: "border-green-300",
                  tag: "bg-green-300",
                  bg: "bg-green-50",
                  shadow: "green-shadow",
                  title: "Eliminate",
                  icon: <DeleteOutlineOutlinedIcon />,
                };
                break;
              default:
                return null;
            }

            return (
              <div className="flex flex-wrap gap-4 w-[45%] h-full">
                <TaskCard
                  key={priority}
                  priority={priority}
                  {...props}
                  taskList={taskList}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Tasks;
