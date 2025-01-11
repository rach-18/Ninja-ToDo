import React, { useState } from "react";
import { useTask } from "../../context/TaskContext";

function NinjaDayPlanner() {
  const { tasks } = useTask();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Define importance colors
  const importanceColors = {
    "Important & Urgent": "#FF5C5C",
    "Important & Not Urgent": "#FFC260",
    "Not Important & Urgent": "#5CA6FF",
    "Not Important & Not Urgent": "#5CCF91",
  };

  // Helper to parse time
  const parseTime = (time) => {
    if (typeof time === "string" && time.includes(":")) {
      // Assuming time format "hh:mm"
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    }
    // If it's already in number format (minutes)
    return Number(time) || 0;
  };

  // Calculate total tasks, work time, and break time
  const calculateMetrics = () => {
    let totalTasks = 0;
    let workTime = 0;
    let breakTime = 0;

    Object.keys(tasks).forEach((priority) => {
      tasks[priority]?.forEach((task) => {
        totalTasks++;
        const taskTime = parseTime(task.time);
        if (task.tag === "Work") {
          workTime += taskTime;
        } else if (task.tag === "Break") {
          breakTime += taskTime;
        }
      });
    });

    return { totalTasks, workTime, breakTime };
  };

  const { totalTasks, workTime, breakTime } = calculateMetrics();

  // Format time in hh:mm
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  };

  // Navigate dates
  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  return (
    <div className="p-5 rounded-xl border-2 border-blue-300 bg-[#F9FAFC] general-shadow space-y-8 mt-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-800">
          Ninja Day Planner
        </h1>
        <div className="flex items-center space-x-3">
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => changeDate(-1)}
          >
            &lt;
          </button>
          <p className="font-medium">{selectedDate.toDateString()}</p>
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => changeDate(1)}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-6 gap-2">
        {Object.keys(tasks).map((priority) =>
          tasks[priority]?.map((task, index) => (
            <div
              key={`${priority}-${index}`}
              className="p-4 rounded-lg text-white font-medium text-sm flex items-center justify-between"
              style={{ backgroundColor: importanceColors[priority] }}
            >
              <span className="truncate">{task.name}</span>
              <span className="text-2xl">:::</span>
            </div>
          ))
        )}
        {/* Empty slots for aesthetic purposes */}
        {[...Array(6 - (totalTasks % 6))].map((_, index) => (
          <div
            key={`empty-${index}`}
            className="border-dashed border-2 border-gray-200 rounded-lg"
          ></div>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-purple-700">Total Tasks</h3>
          <p className="text-3xl font-bold text-center">{totalTasks}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-purple-700">Work Time</h3>
          <p className="text-3xl font-bold text-center text-blue-500">
            {formatTime(workTime)}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-pink-500">Break Time</h3>
          <p className="text-3xl font-bold text-center text-pink-500">
            {formatTime(breakTime)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NinjaDayPlanner;
