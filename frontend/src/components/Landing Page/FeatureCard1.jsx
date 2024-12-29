function FeatureCard1({ arrow, bgColor, borderColor, shadowColor, title, def }) {
    return (
        <>
            <div className="flex gap-10 items-center justify-center h-[30rem] relative">
                <div className="absolute top-1/2 left-[40%]">
                    <img className="w-[70%]" src={arrow} alt="" />
                </div>
                <div className="w-1/2 h-full flex items-center justify-center">
                    <div className={`w-[70%] h-5/6 ${bgColor} border-2 ${borderColor} ${shadowColor} flex justify-center items-center rounded-xl`}>
                        <p>Picture</p>
                    </div>
                </div>
                <div className="w-1/2 text-center flex flex-col items-center justify-center">
                    <p className="font-semibold text-lg">{title}</p>
                    <p className="w-5/6">{def}</p>
                </div>
            </div>
        </>
    );
}

export default FeatureCard1;
