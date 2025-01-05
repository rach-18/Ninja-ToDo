import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTask } from "../../context/TaskContext";

function TimeChart() {
  const { tasks } = useTask();

  // Calculate the total time for each priority
  const priorityTime = (priority) => {
    let sum = 0;
    tasks[priority]?.forEach((task) => {
      sum += Number(task.time); // Ensure task.time is treated as a number
    });
    return sum;
  };

  // Group tasks by tag and calculate total time for each tag
  const calculateTimeByTag = () => {
    const tagTimeMap = {};
    Object.keys(tasks).forEach((priority) => {
      tasks[priority]?.forEach((task) => {
        if (tagTimeMap[task.tag]) {
          tagTimeMap[task.tag] += Number(task.time);
        } else {
          tagTimeMap[task.tag] = Number(task.time);
        }
      });
    });

    return Object.entries(tagTimeMap).map(([tag, time]) => ({ tag, time }));
  };

  const timeByTag = calculateTimeByTag();

  // Total minutes in a day
  const totalMinutesInDay = 1440;

  // Calculate time distribution and free time
  const priorities = [
    { name: "Important & Urgent", color: "#FF5C5C" },
    { name: "Important & Not Urgent", color: "#FFC260" },
    { name: "Not Important & Urgent", color: "#5CA6FF" },
    { name: "Not Important & Not Urgent", color: "#5CCF91" },
  ];

  const timeDistribution = priorities.map((priority) => ({
    name: priority.name,
    value: priorityTime(priority.name),
    color: priority.color,
  }));

  const totalUsedTime = timeDistribution.reduce(
    (acc, item) => acc + item.value,
    0
  );
  const freeTimeValue = totalMinutesInDay - totalUsedTime;

  // Add free time to the distribution
  timeDistribution.push({
    name: "Free Time",
    value: freeTimeValue,
    color: "#E5E5E5",
  });

  return (
    <div className="border-2 border-blue-300 bg-[#F9FAFC] p-5 rounded-xl general-shadow space-y-8 mt-10">
      <div>
        <h2 className="text-xl font-semibold">Time Distribution</h2>
        {freeTimeValue === 1440 ? (
          <div className="flex items-center justify-center py-20">
            <p>No tasks yet? Add a task above to see how your day shapes up!</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between space-x-8">
              {/* Pie Chart */}
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie
                    data={timeDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {timeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Legend */}
              <div>
                <p className="text-lg font-medium">
                  Free Time: {Math.floor(freeTimeValue / 60)}h{" "}
                  {freeTimeValue % 60}m
                </p>
                <ul className="space-y-2">
                  {timeDistribution.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span
                        className="w-4 h-4"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      <p>
                        {item.name} ({Math.floor(item.value / 60)}h{" "}
                        {item.value % 60}m)
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Time Spent by Tag</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={timeByTag}
                  layout="vertical"
                  margin={{ left: 30 }}
                >
                  <XAxis
                    type="number"
                    domain={[0, Math.max(...timeByTag.map((tag) => tag.time))]}
                    tickFormatter={(value) => `${value}m`}
                  />
                  <YAxis type="category" dataKey="tag" width={80} />
                  <Tooltip formatter={(value) => `${value} minutes`} />
                  <Bar dataKey="time" fill="#5CA6FF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TimeChart;
