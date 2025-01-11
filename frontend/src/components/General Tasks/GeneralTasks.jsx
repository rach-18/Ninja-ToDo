import GeneralNavbar from "./GeneralNavbar";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Tasks from "./Tasks";
import AIRephraseModal from "./AIRephraseModal";
import { useState } from "react";
import TotalTime from "./TotalTime";
import TimeChart from "./TimeChart";
import { useTask } from "../../context/TaskContext";
import axios from "axios";
import Footer from "../Footer/Footer";
import NinjaProgress from "./NinjaProgress";
import Unlock from "./Unlock";
import { Link } from "react-router-dom";
import NinjaDayPlanner from "./NinjaDayPlanner";

function GeneralTasks() {
  const [taskInfo, setTaskInfo] = useState({
    task: "",
    priority: "",
    time: "",
    tag: "",
    complete: false,
    menu: false,
  });

  const {
    isRephraseModalOpen,
    setIsRephraseModalOpen,
    priorityOrder,
    tasks,
    setTasks,
    setRephrasedTask,
    setTimeTotal,
    setTotalTasks,
  } = useTask();

  const generateTime = () => {
    const time = [];

    for (let i = 5; i <= 120; i += 5) {
      time.push(i);
    }

    return time;
  };

  const fetchRephrasedTask = async (e) => {
    e.preventDefault();
    setIsRephraseModalOpen(true);
    setRephrasedTask("Clarifying Ninja Task...");

    try {
      const backendUrl =
        process.env.NODE_ENV === "production"
          ? "https://ninja-todo.onrender.com/"
          : "http://127.0.0.1:5000";
      const { data } = await axios.post(`${backendUrl}/api/rephrase`, {
        task: taskInfo.task,
      });
      setRephrasedTask(data.response);
      console.log(data);
    } catch (error) {
      setRephrasedTask("Failed to clarify the task. Please try again!");
      console.log(error);
    }
  };

  const fetchPriority = async (e) => {
    e.preventDefault();
    setTaskInfo((prev) => ({
      ...prev,
      priority: "Please wait...",
    }));

    try {
      const backendUrl =
        process.env.NODE_ENV === "production"
          ? "https://ninja-todo.onrender.com/"
          : "http://127.0.0.1:5000";
      const { data } = await axios.post(`${backendUrl}/api/priority`, {
        task: taskInfo.task,
      });

      setTaskInfo((prev) => ({
        ...prev,
        priority: data.priority,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTime = async (e) => {
    e.preventDefault();
    setTaskInfo((prev) => ({ ...prev, time: "Please wait..." }));

    try {
      const backendUrl =
        process.env.NODE_ENV === "production"
          ? "https://ninja-todo.onrender.com/"
          : "http://127.0.0.1:5000";
      const { data } = await axios.post(`${backendUrl}/api/time`, {
        task: taskInfo.task,
      });

      console.log(data);

      setTaskInfo((prev) => ({
        ...prev,
        time: data.time,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  function handleTaskInfo(e) {
    const newTaskInfo = {
      ...taskInfo,
      [e.target.name]: e.target.value,
    };
    setTaskInfo(newTaskInfo);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { priority, task, time, tag, complete, menu } = taskInfo;
    setTimeTotal((prev) => prev + Number(time));

    if (!priority || !task) {
      // Handle case when priority or task is not selected/entered
      return;
    }

    // Create a copy of tasks to avoid direct mutation
    const updatedTasks = { ...tasks };

    // Check if the selected priority exists, if not, initialize it as an empty array
    if (!updatedTasks[priority]) {
      updatedTasks[priority] = [];
    }

    // Add the task to the selected priority category
    updatedTasks[priority].push({ task, time, tag, complete, menu });

    // Update the tasks state with the new task added to the correct priority box
    setTasks(updatedTasks);
    setTotalTasks((prev) => prev + 1);

    // Reset task input after adding
    setTaskInfo({});
  }

  // console.log(tasks);

  return (
    <>
      <GeneralNavbar />
      <div className="p-5 w-[70%] mx-auto my-10">
        <div className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-5 rounded-xl general-shadow">
          <p className="font-bold text-3xl block bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            What's your Ninja mission for today?
          </p>
          <form className="mt-5" onSubmit={handleSubmit}>
            <div className="general-shadow bg-white flex items-center justify-between pr-5 pl-5 py-3 rounded-lg gap-5">
              <input
                className="w-full outline-none"
                onChange={handleTaskInfo}
                type="text"
                name="task"
                placeholder="Enter your task..."
                value={taskInfo.task || ""}
                required
              />
              <button
                onClick={fetchRephrasedTask}
                className="flex gap-1 text-blue-600 hover:bg-blue-100 py-2 px-3 rounded-lg transition-all"
              >
                <AutoAwesomeOutlinedIcon />
                AI
              </button>
            </div>
            <div className="mt-5 flex gap-5">
              <div className="flex items-center justify-between px-5 py-5 gap-5 rounded-lg general-shadow bg-white w-1/3">
                <select
                  className="outline-none"
                  name="priority"
                  onChange={handleTaskInfo}
                  value={
                    taskInfo.priority === "Please wait..."
                      ? ""
                      : taskInfo.priority || ""
                  }
                  // value={taskInfo.priority || ""}
                >
                  <option value="" disabled selected>
                    Select Priority
                  </option>
                  <option value="Important & Urgent">Important & Urgent</option>
                  <option value="Important & Not Urgent">
                    Important & Not Urgent
                  </option>
                  <option value="Not Important & Urgent">
                    Not Important & Urgent
                  </option>
                  <option value="Not Important & Not Urgent">
                    Not Important & Not Urgent
                  </option>
                </select>
                <button
                  onClick={fetchPriority}
                  className="flex gap-4 text-purple-600"
                >
                  <ErrorOutlineOutlinedIcon />
                  AI
                </button>
              </div>
              <div className="flex items-center justify-between px-5 py-5 gap-5 rounded-lg general-shadow bg-white w-1/3">
                <select
                  className="outline-none"
                  name="time"
                  onChange={handleTaskInfo}
                  value={
                    taskInfo.time === "Please wait..."
                      ? ""
                      : taskInfo.time || ""
                  }
                >
                  <option value="" disabled selected>
                    Select Time
                  </option>
                  {generateTime().map((time) => {
                    return (
                      <option key={time} value={time}>
                        {time} min
                      </option>
                    );
                  })}
                </select>
                <button
                  onClick={fetchTime}
                  className="flex gap-4 text-pink-600"
                >
                  <AccessTimeOutlinedIcon />
                  AI
                </button>
              </div>
              <div className="flex items-center justify-between px-5 py-5 gap-5 rounded-lg general-shadow bg-white w-1/3">
                <select
                  className="outline-none"
                  name="tag"
                  onChange={handleTaskInfo}
                  value={taskInfo.tag || ""}
                >
                  <option value="" disabled selected>
                    Select Tag
                  </option>
                  <option value="Work">Work</option>
                  <option value="Side Hustle">Side Hustle</option>
                  <option value="Family">Family</option>
                  <option value="Misc">Misc</option>
                </select>
                <Link to="/early-access" className="flex gap-4 text-green-600">
                  <LocalOfferOutlinedIcon />
                  Custom
                </Link>
              </div>
            </div>
            <div className="flex justify-center mt-8 w-full">
              <button
                className="w-full bg-gradient-to-r from-blue-500/60 via-purple-500/60 to-pink-500/60 text-white text-xl px-4 py-2 rounded-lg shadow-xl w-1/2 mx-auto hover:scale-[1.02] transition-all"
                type="submit"
              >
                <BoltOutlinedIcon />
                Add Ninja Task
              </button>
            </div>
          </form>
        </div>
        {/* <hr className="h-0.5 w-5/6 mx-auto bg-blue-100 mt-8 mb-5" /> */}
        <Tasks />
        {/* <hr className="h-0.5 w-5/6 mx-auto bg-blue-100 mt-8 mb-5" /> */}
        <TotalTime />
        <TimeChart />
        <NinjaDayPlanner />
        <NinjaProgress />
        <Unlock />
      </div>
      <AIRephraseModal
        isRephraseModalOpen={isRephraseModalOpen}
        setIsRephraseModalOpen={setIsRephraseModalOpen}
        original={taskInfo.task}
        setTaskInfo={setTaskInfo}
        taskInfo={taskInfo}
      />
      <Footer />
    </>
  );
}

export default GeneralTasks;
