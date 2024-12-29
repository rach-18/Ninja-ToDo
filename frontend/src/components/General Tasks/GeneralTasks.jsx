import GeneralNavbar from "./GeneralNavbar";
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import Tasks from "./Tasks";
import AIRephraseModal from "./AIRephraseModal";
import { useState } from "react";
import TotalTime from "./TotalTime";
import TimeChart from "./TimeChart";
import { useTask } from "../../context/TaskContext";
import axios from 'axios';

function GeneralTasks() {
    const [taskInfo, setTaskInfo] = useState({
        task: '',
        priority: '',
        time: '',
        complete: false,
        menu: false
    });

    const {
        isRephraseModalOpen, 
        setIsRephraseModalOpen,
        priorityOrder,
        tasks,
        setTasks,
    } = useTask();

    const generateTime = () => {
        const time = [];

        for(let i=5;i<=120;i+=5) {
            time.push(i);
        }

        return time;
    }

    const fetchRephrasedTask = async (e) => {
        e.preventDefault();
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/general-task`, {
            task: taskInfo.task
        });
        console.log(data);
        setIsRephraseModalOpen(true);
    }

    function handleTaskInfo(e) {
        const newTaskInfo = {
            ...taskInfo,
            [e.target.name] : e.target.value
        };
        setTaskInfo(newTaskInfo);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // console.log(taskInfo);
        const {priority, task, time, complete, menu} = taskInfo;
        const updatedTasks = {...tasks};

        if(!updatedTasks[priority]) {
            updatedTasks[priority] = [];
        }
        updatedTasks[priority].push({task, time, complete, menu});

        setTasks(updatedTasks);

        console.log('Updated tasks: ', updatedTasks);

        setTaskInfo({});
        // console.log('Tasks: ', tasks);
    }

    return (
        <>
            <GeneralNavbar />
            <div className="border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-5 w-11/12 mx-auto rounded-xl my-10">
                <p className="font-bold text-4xl text-center block text-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">What's your Ninja mission for today?</p>
                <form 
                    className="mt-5"
                    onSubmit={handleSubmit}
                >
                    <div className="general-shadow bg-white flex items-center justify-between pl-5 pr-8 py-3 rounded-lg gap-5">
                        <input 
                            className="w-full outline-none" 
                            onChange={handleTaskInfo}
                            type="text" 
                            name="task" 
                            placeholder="Enter your task..." 
                            value={taskInfo.task || ''}
                            required
                        />
                    </div>
                    <div className="mt-5 flex gap-5">
                        <select 
                            className="w-full px-5 py-5 outline-none rounded-lg general-shadow" 
                            name="priority" 
                            onChange={handleTaskInfo}
                            value={taskInfo.priority || ''}
                            required
                        >
                            <option value="" disabled selected>Select Priority</option>
                            <option value="Important & Urgent">Important & Urgent</option>
                            <option value="Important & Not Urgent">Important & Not Urgent</option>
                            <option value="Not Important & Urgent">Not Important & Urgent</option>
                            <option value="Not Important & Not Urgent">Not Important & Not Urgent</option>
                        </select>
                        <select 
                            className="w-full px-5 py-5 outline-none rounded-lg general-shadow" 
                            name="time"
                            onChange={handleTaskInfo}
                            value={taskInfo.time || ''}
                            required
                        >
                            <option value="" disabled selected>Select Time</option>
                            {
                                generateTime().map((time) => {
                                    return <option key={time} value={time}>{time} min</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="mt-5 flex gap-5 justify-between">
                        <button onClick={fetchRephrasedTask} className="flex gap-4 w-full bg-black rounded-lg px-3 py-2 justify-center bg-white border-2 text-blue-600 border-blue-600 blue-hover hover:scale-[1.01] transition-all">
                            <AutoAwesomeOutlinedIcon />
                            AI Rephrase
                        </button>
                        <button className="flex gap-4 w-full bg-black rounded-lg px-3 py-2 justify-center bg-white border-2 text-purple-600 border-purple-600 purple-hover hover:scale-[1.01] transition-all">
                            <ErrorOutlineOutlinedIcon />
                            Suggest Priority
                        </button>
                        <button className="flex gap-4 w-full bg-black rounded-lg px-3 py-2 justify-center bg-white border-2 text-pink-600 border-pink-600 pink-hover hover:scale-[1.01] transition-all">
                            <AccessTimeOutlinedIcon />
                            Suggest Time
                        </button>
                    </div>
                    <div className="flex justify-center mt-8">
                        <button className="bg-gradient-to-r from-blue-500/60 via-purple-500/60 to-pink-500/60 text-white text-xl px-4 py-2 rounded-lg shadow-xl w-1/2 mx-auto hover:scale-105 transition-all" type="submit">
                            <BoltOutlinedIcon />
                            Add Task
                        </button>
                    </div>
                </form>
                <hr className="h-0.5 w-5/6 mx-auto bg-blue-100 mt-8 mb-5" />
                <Tasks />
                <hr className="h-0.5 w-5/6 mx-auto bg-blue-100 mt-8 mb-5" />
                <TotalTime />
                <TimeChart />
            </div>
            <AIRephraseModal isRephraseModalOpen={isRephraseModalOpen} setIsRephraseModalOpen={setIsRephraseModalOpen} />
        </>
    )
}

export default GeneralTasks;
