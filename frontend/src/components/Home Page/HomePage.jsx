import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Zap,
  Tag,
} from "lucide-react";
// import { EisenhowerMatrix } from "./eisenhower-matrix";
// import { TotalTime } from "./total-time";
// import { TimeRing } from "./time-ring";
// import { AIFeedback } from "./ai-feedback";
import { useRouter } from "next/navigation";
// import { NinjaProgress } from "./ninja-progress";

function HomePage() {
  const sampleTasks = [
    {
      id: "1",
      description: "Complete project proposal",
      priority: "Important & Urgent",
      timeEstimate: "90",
      completed: false,
      tag: "Work",
    },
    {
      id: "2",
      description: "Review team performance",
      priority: "Important & Not Urgent",
      timeEstimate: "60",
      completed: false,
      tag: "Work",
    },
    {
      id: "3",
      description: "Respond to client emails",
      priority: "Not Important & Urgent",
      timeEstimate: "30",
      completed: false,
      tag: "Work",
    },
    {
      id: "4",
      description: "Organize digital files",
      priority: "Not Important & Not Urgent",
      timeEstimate: "45",
      completed: false,
      tag: "Misc",
    },
  ];

  const [task, setTask] = useState("");
  const [rephrasedTask, setRephrasedTask] = useState("");
  const [showRephraseModal, setShowRephraseModal] = useState(false);
  const [priority, setPriority] = useState("");
  const [timeEstimate, setTimeEstimate] = useState("");
  const [tag, setTag] = useState("");
  const [tasks, setTasks] = useState(sampleTasks);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const router = useRouter();

  const handleRephrase = async () => {
    setShowRephraseModal(true);
    const clarifiedTask = await simulateAIClarification(task);
    setRephrasedTask(clarifiedTask);
  };

  const simulateAIClarification = async (originalTask) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let clarifiedTask = originalTask.trim();

    if (!clarifiedTask.includes("by")) {
      const timeOptions = [
        "by 5 PM today",
        "by noon tomorrow",
        "within 2 hours",
        "by end of day",
      ];
      clarifiedTask +=
        " " + timeOptions[Math.floor(Math.random() * timeOptions.length)];
    }

    const actionVerbs = ["Complete", "Finish", "Prepare", "Review", "Submit"];
    if (!actionVerbs.some((verb) => clarifiedTask.startsWith(verb))) {
      clarifiedTask =
        actionVerbs[Math.floor(Math.random() * actionVerbs.length)] +
        " " +
        clarifiedTask;
    }

    if (clarifiedTask.length > 100) {
      clarifiedTask = clarifiedTask.substring(0, 97) + "...";
    }

    return clarifiedTask;
  };

  const handleAIRecommend = (type) => {
    if (type === "priority") {
      const priorities = [
        "Important & Urgent",
        "Important & Not Urgent",
        "Not Important & Urgent",
        "Not Important & Not Urgent",
      ];
      setPriority(priorities[Math.floor(Math.random() * priorities.length)]);
    } else {
      const time = (Math.floor(Math.random() * 24) + 1) * 5;
      setTimeEstimate(time.toString());
    }
  };

  const handleAddTask = () => {
    const newTask = {
      id: Date.now().toString(),
      description: task,
      priority,
      timeEstimate,
      completed: false,
      tag,
    };
    setTasks([...tasks, newTask]);
    setTask("");
    setPriority("");
    setTimeEstimate("");
    setTag("");
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
    }, 2000);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (taskToEdit) => {
    setTask(taskToEdit.description);
    setPriority(taskToEdit.priority);
    setTimeEstimate(taskToEdit.timeEstimate);
    setTag(taskToEdit.tag);
    setTasks(tasks.filter((task) => task.id !== taskToEdit.id));
  };

  const handleMarkComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const priorityOptions = [
    "Important & Urgent",
    "Important & Not Urgent",
    "Not Important & Urgent",
    "Not Important & Not Urgent",
  ];

  const timeOptions = Array.from({ length: 24 }, (_, i) => (i + 1) * 5);

  const tagOptions = ["Work", "Side Hustle", "Family", "Misc"];

  return (
    <>
      <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 shadow-2xl border-2 border-blue-200 rounded-3xl overflow-hidden">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="relative">
              <label
                htmlFor="task"
                className="block text-2xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
              >
                What's your ninja mission for today?
              </label>
              <div className="relative">
                <Textarea
                  id="task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Enter your task here..."
                  className="w-full h-24 text-lg border-2 border-blue-300 focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-2xl transition duration-300 shadow-inner pr-20"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 bottom-2 text-blue-500 hover:bg-blue-100"
                  onClick={handleRephrase}
                  title="AI Enhance: Refine your task description"
                >
                  <Sparkles className="h-4 w-4" />
                  AI
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="relative">
                <label
                  htmlFor="priority"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Priority Level
                </label>
                <div className="relative">
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger
                      id="priority"
                      className="w-full border-2 border-blue-300 rounded-xl text-gray-700 pr-20"
                    >
                      <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-500 hover:bg-purple-100"
                    onClick={() => handleAIRecommend("priority")}
                    title="AI Suggest: Get an AI-recommended priority"
                  >
                    <AlertCircle className="h-4 w-4" />
                    AI
                  </Button>
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="time"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Time Estimate
                </label>
                <div className="relative">
                  <Select value={timeEstimate} onValueChange={setTimeEstimate}>
                    <SelectTrigger
                      id="time"
                      className="w-full border-2 border-blue-300 rounded-xl text-gray-700 pr-20"
                    >
                      <SelectValue placeholder="Estimated Time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((minutes) => (
                        <SelectItem key={minutes} value={minutes.toString()}>
                          {minutes} min
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-pink-500 hover:bg-pink-100"
                    onClick={() => handleAIRecommend("time")}
                    title="AI Estimate: Get an AI-suggested time estimate"
                  >
                    <Clock className="h-4 w-4" />
                    AI
                  </Button>
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="tag"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Tag
                </label>
                <div className="relative">
                  <Select value={tag} onValueChange={setTag}>
                    <SelectTrigger
                      id="tag"
                      className="w-full border-2 border-blue-300 rounded-xl text-gray-700 pr-24"
                    >
                      <SelectValue placeholder="Select Tag" />
                    </SelectTrigger>
                    <SelectContent>
                      {tagOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 hover:bg-green-100"
                    onClick={() => router.push("/early-access")}
                    title="Customize Tags: Add more options (Early Access)"
                  >
                    <Tag className="h-4 w-4" />
                    Custom
                  </Button>
                </div>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                disabled={!task || !priority || !timeEstimate || !tag}
                onClick={handleAddTask}
              >
                <Zap className="w-6 h-6 mr-2" />
                Add Ninja Task
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default HomePage;
