import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import { Link } from "react-router-dom";

function Unlock() {
  return (
    <>
      <div className="border-2 border-blue-300 bg-[#F9FAFC] mt-10 rounded-xl general-shadow py-5 px-8 flex flex-col items-center">
        <p className="text-center font-bold text-3xl">
          Unlock Your Ninja Powers
        </p>
        <ul className="my-5 text-lg w-full">
          <li className="flex items-center gap-2 my-2">
            <CheckCircleOutlinedIcon sx={{ color: "#21C55D" }} /> Chunking:
            Break down big tasks into manageable ninja moves
          </li>
          <li className="flex items-center gap-2 my-2">
            <CheckCircleOutlinedIcon sx={{ color: "#21C55D" }} /> Task Related
            Note Taking & File Storage: Keep all your scrolls in one place
          </li>
          <li className="flex items-center gap-2 my-2">
            <CheckCircleOutlinedIcon sx={{ color: "#21C55D" }} /> Time Boxing:
            Master the art of time manipulation
          </li>
          <li className="flex items-center gap-2 my-2">
            <CheckCircleOutlinedIcon sx={{ color: "#21C55D" }} /> Pomodoro
            Timer: Harness the power of focused work sprints
          </li>
          <li className="flex items-center gap-2 my-2">
            <CheckCircleOutlinedIcon sx={{ color: "#21C55D" }} /> Performance
            Feedback: Analyze your ninja skills and level up
          </li>
        </ul>
        <Link
          className="text-white bg-purple-500 py-2 w-full rounded-lg text-center"
          to="#"
        >
          <BoltOutlinedIcon />
          Become an Early Access Ninja
        </Link>
      </div>
    </>
  );
}

export default Unlock;
