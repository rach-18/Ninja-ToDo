import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { useTask } from "../../context/TaskContext";

function TotalTime() {
  const { timeTotal } = useTask();

  function convertMinutesToHours(minutes) {
    if (typeof minutes !== "number" || minutes < 0) {
      return "Invalid input. Please enter a non-negative number.";
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return hours === 0
      ? `${remainingMinutes}m`
      : `${hours}h ${remainingMinutes}m`;
  }

  return (
    <>
      <div className="bg-gradient-to-br from-blue-500/60 to-purple-600/60 mx-auto py-5 px-8 rounded-lg general-shadow mt-10">
        <p className="font-bold text-3xl mb-5 text-white">Total Ninja Time</p>
        <div className="flex items-center justify-between">
          <div className="text-white">
            <p className="font-bold text-5xl">
              {timeTotal > 0 ? convertMinutesToHours(timeTotal) : "0m"}
            </p>
            <p>to complete remaining missions</p>
          </div>
          <button className="bg-white px-5 py-3 rounded-lg shadow-md hover:scale-[1.03] transition-all">
            <AutoAwesomeOutlinedIcon /> AI Optimize
          </button>
        </div>
      </div>
    </>
  );
}

export default TotalTime;
