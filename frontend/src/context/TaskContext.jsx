import { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
    // States
    const [tasks, setTasks] = useState({});    
    const [isRephraseModalOpen, setIsRephraseModalOpen] = useState(false);
    const [taskInput, setTaskInput] = useState("");
    const [rephrasedTask, setRephrasedTask] = useState("");
    const [priority, setPriority] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const priorityOrder = {
        'Important & Urgent' : 1,
        'Important & Not Urgent': 2,
        'Not Important & Urgent': 3,
        'Not Important & Not Urgent': 4
    }

    // Functions
    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleRephrase = async () => {
        if (!taskInput.trim()) return;

        try {
            const response = await fetch('your-backend-url/rephrase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: taskInput })
            });

            const data = await response.json();
            setRephrasedTask(data.rephrasedTask);
            setIsRephraseModalOpen(true);
        } catch (error) {
            console.error('Error rephrasing task:', error);
        }
    };

    const toggleComplete = (priority, taskIndex) => {
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks }; // Copy the tasks object
            updatedTasks[priority] = [...updatedTasks[priority]]; // Copy the specific priority array
            updatedTasks[priority][taskIndex] = {
                ...updatedTasks[priority][taskIndex], // Copy the specific task object
                complete: !updatedTasks[priority][taskIndex].complete // Toggle complete status
            };
            return updatedTasks;
        });
    };
    
    const deleteTask = (priority, taskIndex) => {
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks }; // Create a copy of the tasks object
            updatedTasks[priority] = updatedTasks[priority].filter(
                (_, index) => index !== taskIndex // Remove the task at the given index
            );

            if(updatedTasks[priority].length === 0) {
                delete updatedTasks[priority];
            }
            return updatedTasks;
        });
    };    

    return (
        <TaskContext.Provider value={{
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
            // Functions
            addTask,
            handleRephrase,
            toggleComplete,
            deleteTask
        }}>
            {children}
        </TaskContext.Provider>
    );
}

// Custom hook to use the context
export function useTask() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTask must be used within a TaskProvider');
    }
    return context;
}