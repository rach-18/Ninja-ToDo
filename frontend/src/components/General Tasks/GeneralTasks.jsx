import GeneralNavbar from "./GeneralNavbar";
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Tasks from "./Tasks";

function GeneralTasks() {
    const generateTime = () => {
        const time = [];

        for(let i=5;i<=120;i+=5) {
            time.push(i);
        }

        return time;
    }

    return (
        <>
            <GeneralNavbar />
            <div className="border-2 border-dashed border-black p-5 w-11/12 mx-auto rounded-xl my-10">
                <p className="font-bold text-4xl text-center">What do you want to get done today?</p>
                <form action="" className="mt-5">
                    <div className="general-shadow bg-white flex items-center justify-between pl-5 pr-8 py-3 rounded-lg gap-5">
                        <input className="w-full outline-none" type="text" name="task" placeholder="Enter your task..." />
                    </div>
                    <div className="mt-5 flex gap-5">
                        <select className="w-full px-5 py-5 outline-none rounded-lg general-shadow" name="priority" id="priority">
                            <option value="" disabled selected>Select Priority</option>
                            <option value="4">Important & Urgent</option>
                            <option value="3">Important & Not Urgent</option>
                            <option value="2">Not Important & Urgent</option>
                            <option value="1">Not Important & Not Urgent</option>
                        </select>
                        <select className="w-full px-5 py-5 outline-none rounded-lg general-shadow" name="priority" id="priority">
                            <option value="" disabled selected>Select Time</option>
                            {
                                generateTime().map((time) => {
                                    return <option key={time} value={time}>{time} min</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="mt-5 flex gap-5 justify-between">
                        <button className="flex gap-4 w-full bg-black rounded-lg px-3 py-2 justify-center bg-white border-2 border-black hover-shadow hover:scale-[1.01] transition-all">
                            <CachedOutlinedIcon />
                            AI Rephrase
                        </button>
                        <button className="flex gap-4 w-full bg-black rounded-lg px-3 py-2 justify-center bg-white border-2 border-black hover-shadow hover:scale-[1.01] transition-all">
                            <ErrorOutlineOutlinedIcon />
                            Suggest Priority
                        </button>
                        <button className="flex gap-4 w-full bg-black rounded-lg px-3 py-2 justify-center bg-white border-2 border-black hover-shadow hover:scale-[1.01] transition-all">
                            <AccessTimeOutlinedIcon />
                            Suggest Time
                        </button>
                    </div>
                    <div className="flex justify-center mt-8">
                        <button className="slide-color border-[1px] border-white text-white text-xl px-4 py-2 rounded-lg shadow-xl w-1/2 mx-auto hover:scale-105 transition-all" type="submit">Add Task</button>
                    </div>
                </form>
                <hr className="h-0.5 w-5/6 mx-auto bg-gray-200 my-8" />
                <Tasks />
            </div>
        </>
    )
}

export default GeneralTasks;
