import FeatureCard1 from "./FeatureCard1";
import FeatureCard2 from "./FeatureCard2";

function Features() {
    return (
        <>
            <div className="mt-20">
                <p className="font-bold text-4xl text-center block">With NinjaTodo, Get Sh*t Done</p>
                <p className="w-1/2 mx-auto text-center mt-8">NinjaTodo is your personal productivity coach, designed to help you overcome mental hurdles and achieve your goals.</p>
                <p className="font-semibold text-2xl mt-12 text-center">How NinjaTodo Helps You Win</p>
                <div className="mt-10">
                    <FeatureCard1 
                        arrow="BlueArrow.png" 
                        bgColor="bg-blue-50" 
                        borderColor="border-blue-300" 
                        shadowColor="feature-blue-shadow"
                        title="Task Clarity"
                        def="AI rewrites your vague tasks into clear, actionable goals and recommends optimal time required so you can easily start." 
                    />
                    <FeatureCard2 
                        arrow="BlueArrow.png" 
                        bgColor="bg-blue-50" 
                        borderColor="border-blue-300" 
                        shadowColor="feature-blue-shadow"
                        title="Intelligent Prioritization"
                        def="AI recommends you a task priority by understanding your goal. It then uses Eisenhower matrix to tell you what you should do first."
                    />
                    <FeatureCard1
                        arrow="PurpleArrow.png"
                        bgColor="bg-purple-50"
                        borderColor="border-purple-300"
                        shadowColor="feature-purple-shadow"
                        title="Smart Breakdown"
                        def="Large projects are automatically divided into small, manageable chunks."
                    />
                    <FeatureCard2
                        arrow="PurpleArrow.png"
                        bgColor="bg-purple-50"
                        borderColor="border-purple-300"
                        shadowColor="feature-purple-shadow"
                        title="Guided Focus Sessions"
                        def="Action one task at a time in the dedicated focus areas to maintain concentration and build momentum."
                    />
                    <FeatureCard1
                        arrow="PinkArrow.png"
                        bgColor="bg-pink-50"
                        borderColor="border-pink-300"
                        shadowColor="feature-pink-shadow"
                        title="Progress Tracking"
                        def="Measure and visualize your achievements. Receive AI feedback immediately, improve and stay motivated with our progress tracker."
                    />
                    <FeatureCard2
                        arrow="PinkArrow.png"
                        bgColor="bg-pink-50"
                        borderColor="border-pink-300"
                        shadowColor="feature-pink-shadow"
                        title="Second Brain"
                        def="Store all the task related notes. Search and retrieve them later easily."
                    />
                </div>
            </div>
        </>
    );
}

export default Features;
