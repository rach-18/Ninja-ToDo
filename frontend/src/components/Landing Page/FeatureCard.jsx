function FeatureCard({ index, bgColor, icon, title, description, noMore }) {
    return (
        <>
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="flex flex-col md:flex-row items-center p-8 relative">
                    <div className={`absolute top-0 left-0 w-16 h-16 ${bgColor} text-white flex items-center justify-center text-2xl font-bold rounded-br-2xl`}>
                        {index + 1}
                    </div>
                    <div className="md:w-1/2 mb-6 md:mb-0 md:mr-6 pl-20">
                        <div className={`bg-gradient-to-r ${bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}>
                            {/* <feature.icon className="h-8 w-8 text-white" /> */}
                            {icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
                        <p className="text-gray-600">
                        {description}
                        <span className="font-bold text-indigo-700">{noMore}</span>
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        {/* <Image 
                        src={feature.image || "/placeholder.svg?height=300&width=400"} 
                        alt={feature.title} 
                        width={400} 
                        height={300} 
                        className="rounded-2xl shadow-lg"
                        /> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default FeatureCard;
