// import FeatureCard from "./FeatureCard";
// import FeatureCard1 from "./FeatureCard1";
// import FeatureCard2 from "./FeatureCard2";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import CenterFocusWeakOutlinedIcon from '@mui/icons-material/CenterFocusWeakOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';

function Features() {
    return (
        <>
            <div className="my-20">
                <p className="font-bold text-4xl text-center block">With NinjaTodo, Get Sh*t Done</p>
                <p className="w-1/2 mx-auto text-center mt-8">NinjaTodo is your personal productivity coach, designed to help you overcome mental hurdles and achieve your goals.</p>
                <p className="font-semibold text-2xl mt-12 text-center">How NinjaTodo Helps You Win</p>
                <div className="mt-10 flex flex-col gap-8 justify-center items-center">
                    {[
                        {
                            icon: LightbulbOutlinedIcon,
                            title: "Clear Planning",
                            description: "Write clear, actionable tasks with precise time estimates, using AI assistance when needed to refine your plans. ",
                            noMore: "No more procrastination.",
                            gradient: "from-[#6B7CFF] to-[#87CEEB]"
                        },
                        {
                            icon: BoltOutlinedIcon,
                            title: "Intelligent Prioritization",
                            description: "Prioritize tasks with AI recommendations based on your goals and habits, using the Eisenhower Matrix to focus on what matters most. ",
                            noMore: "No more feeling overwhelmed.",
                            gradient: "from-[#87CEEB] to-[#FF69B4]"
                        },
                        {
                            icon: ListOutlinedIcon,
                            title: "Smart Breakdown",
                            description: "Break large tasks into manageable chunks, making progress easy and actionable. ",
                            noMore: "No more feeling lost.",
                            gradient: "from-[#6B7CFF] to-[#FF69B4]"
                        },
                        {
                            icon: CenterFocusWeakOutlinedIcon,
                            title: "Guided Focus Sessions",
                            description: "Focus on one task at a time with timers, notes, countdowns, and all productivity tools in one dedicated space. ",
                            noMore: "No more scattered focus.",
                            gradient: "from-[#FF69B4] to-[#6B7CFF]"
                        },
                        {
                            icon: TaskAltOutlinedIcon,
                            title: "Progress Tracking",
                            description: "Track achievements, get real-time AI feedback, and see smarter, habit-based recommendations to keep improving. ",
                            noMore: "No more feeling stuck and stagnant.",
                            gradient: "from-[#87CEEB] to-[#6B7CFF]"
                        },
                        {
                            icon: PsychologyOutlinedIcon,
                            title: "Second Brain",
                            description: "Store and retrieve all task-related notes, details, and progress easily in one organized space. ",
                            noMore: "No more feeling disorganized.",
                            gradient: "from-[#FF69B4] to-[#87CEEB]"
                        }
                    ].map((feature, index) => (
                        <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-5/6">
                            <div className="flex flex-col md:flex-row items-center p-8 relative">
                                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-r from-[#6B7CFF] to-[#FF69B4] text-white flex items-center justify-center text-2xl font-bold rounded-br-2xl">
                                    {index + 1}
                                </div>
                                <div className="md:w-1/2 mb-6 md:mb-0 md:mr-6 pl-20">
                                    <div className={`bg-gradient-to-r ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}>
                                        <feature.icon sx={{fontSize: 35}} className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                        <span className="font-bold text-[#4B0082]">{feature.noMore}</span>
                                    </p>
                                </div>
                                <div className="md:w-1/2 bg-gray-200 w-[8rem] h-[18rem] rounded-2xl shadow-lg flex items-center justify-center">
                                    <p>Image or Video</p>
                                    {/* <img 
                                        src={feature.image || "/placeholder.svg?height=300&width=400"} 
                                        alt={feature.title} 
                                        width={400} 
                                        height={300} 
                                        className="rounded-2xl shadow-lg"
                                    /> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Features;
