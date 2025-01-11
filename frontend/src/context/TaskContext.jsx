import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  // States
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : {
          "Important & Urgent": [],
          "Important & Not Urgent": [],
          "Not Important & Urgent": [],
          "Not Important & Not Urgent": [],
        };
  });

  const [isRephraseModalOpen, setIsRephraseModalOpen] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [rephrasedTask, setRephrasedTask] = useState(
    "Clarifying Ninja Task..."
  );
  const [priority, setPriority] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeTotal, setTimeTotal] = useState(() => {
    const savedTimeTotal = localStorage.getItem("timeTotal");
    return savedTimeTotal ? Number(savedTimeTotal) : 0;
  });

  const [totalTasks, setTotalTasks] = useState(() => {
    const savedTotalTasks = localStorage.getItem("totalTasks");
    return savedTotalTasks ? Number(savedTotalTasks) : 0;
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompletedTasks = localStorage.getItem("completedTasks");
    return savedCompletedTasks ? Number(savedCompletedTasks) : 0;
  });

  const priorityOrder = {
    "Important & Urgent": 1,
    "Important & Not Urgent": 2,
    "Not Important & Urgent": 3,
    "Not Important & Not Urgent": 4,
  };

  // Sync tasks, totalTasks, and completedTasks to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("totalTasks", totalTasks.toString());
  }, [totalTasks]);

  useEffect(() => {
    localStorage.setItem("completedTasks", completedTasks.toString());
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem("timeTotal", timeTotal.toString());
  }, [timeTotal]);

  // Functions
  const addTask = (newTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [priority]: [...prevTasks[priority], newTask],
    }));
    setTotalTasks((prev) => prev + 1);
  };

  const handleRephrase = async () => {
    if (!taskInput.trim()) return;

    try {
      const response = await fetch("api/rephrase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: taskInput }),
      });

      const data = await response.json();
      console.log(data);
      setRephrasedTask(data.rephrasedTask);
      setIsRephraseModalOpen(true);
    } catch (error) {
      console.error("Error rephrasing task:", error);
    }
  };

  const toggleComplete = (priority, taskIndex) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[priority] = [...updatedTasks[priority]];

      const task = updatedTasks[priority][taskIndex];
      const taskDuration = Number(task.time);

      setTimeTotal((prevTimeTotal) =>
        task.complete
          ? prevTimeTotal + taskDuration
          : prevTimeTotal - taskDuration
      );
      setCompletedTasks((prev) => (task.complete ? prev - 1 : prev + 1));

      updatedTasks[priority][taskIndex] = {
        ...task,
        complete: !task.complete,
      };

      return updatedTasks;
    });
  };

  const deleteTask = (priority, taskIndex) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      const timeDuration = Number(updatedTasks[priority][taskIndex].time);
      if (!tasks[priority][taskIndex].complete) {
        setTimeTotal((prev) => prev - timeDuration);
      }
      updatedTasks[priority] = updatedTasks[priority].filter(
        (_, index) => index !== taskIndex
      );

      return updatedTasks;
    });
    setTotalTasks((prev) => prev - 1);
    if (completedTasks > 0) {
      setCompletedTasks((prev) => prev - 1);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        // States
        tasks,
        setTasks,
        isRephraseModalOpen,
        setIsRephraseModalOpen,
        taskInput,
        setTaskInput,
        rephrasedTask,
        setRephrasedTask,
        priority,
        setPriority,
        selectedTime,
        setSelectedTime,
        priorityOrder,
        timeTotal,
        setTimeTotal,
        totalTasks,
        setTotalTasks,
        completedTasks,
        setCompletedTasks,
        // Functions
        addTask,
        handleRephrase,
        toggleComplete,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// Custom hook to use the context
export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}
