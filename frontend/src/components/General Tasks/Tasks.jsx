import { useState } from "react";

function Tasks() {
    const [tasks, setTasks] = useState([])

    return (
        <div className="bg-white w-full px-5 py-3 rounded-lg general-shadow border-2 border-black">
            <p className="text-center font-semibold text-2xl mb-5">Tasks</p>
            {
                tasks.length === 0 ? (
                    <p className="text-gray-500 text-center">Your future tasks will go here - make them count! 🎯</p>
                ) : (
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, dolor.</p>
                )
            }
        </div>
    )
}

export default Tasks;
