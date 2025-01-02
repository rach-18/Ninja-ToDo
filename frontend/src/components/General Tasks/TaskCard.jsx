import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CustomizedMenus from "./StyledMenu";

function TaskCard({
  border,
  tag,
  bg,
  shadow,
  title,
  icon,
  taskList,
  priority,
}) {
  //   console.log(priority);
  return (
    <div
      className={`bg-white border-2 ${border} w-full p-5 rounded-lg ${shadow}`}
    >
      <p className="font-semibold text-lg flex items-center gap-2">
        {icon} {title}
      </p>
      {taskList.map((task, index) => (
        <div
          key={index}
          className={`flex gap-4 justify-between mt-2 ${bg} items-center rounded-lg py-3 px-4 shadow-sm`}
        >
          <div>
            {}
            {!task.complete ? (
              <p>{task.task}</p>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircleOutlineOutlinedIcon sx={{ color: "#21C55D" }} />
                <s className="text-gray-300">{task.task}</s>
              </div>
            )}
            <div className="mt-2 flex gap-5 text-xs">
              <p
                className={`flex items-center gap-1 ${tag} text-white px-3 py-1 rounded-full`}
              >
                <TimerOutlinedIcon sx={{ fontSize: 16 }} /> {task.time} min
              </p>
              <p className={`${tag} text-white px-3 py-1 rounded-full`}>
                {priority}
              </p>
            </div>
          </div>
          <CustomizedMenus
            complete={task.complete}
            priority={priority}
            taskIndex={index}
          />
          {/* <button className='hover:bg-white transition-all rounded-full p-1'><MoreVertOutlinedIcon /></button> */}
        </div>
      ))}
    </div>
  );
}

export default TaskCard;
