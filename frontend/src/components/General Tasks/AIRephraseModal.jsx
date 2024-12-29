function AIRephraseModal({ isRephraseModalOpen, setIsRephraseModalOpen }) {
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <>
            {isRephraseModalOpen && (
                <div 
                    className="fixed inset-0 bg-black/50"
                    onClick={() => setIsRephraseModalOpen(false)}
                >
                    <div className="flex justify-center items-center h-full">
                        <div 
                            className="bg-white w-1/2 p-5 rounded-lg border-2 border-black"
                            onClick={handleModalClick}
                        >
                            <p className="font-semibold">Rephrased Task</p>
                            <p>I have made your task more specific and actionable</p>
                            <p className="font-semibold mt-5">Original:</p>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <p className="font-semibold mt-5">Rephrased:</p>
                            <p>Complete first draft of quarterly sales report by 5 PM today, including an executive summary, key performance indicators, and recommendations for the next quarter.</p>
                            <div className="mt-5 flex gap-5 justify-between">
                                <button 
                                    onClick={() => setIsRephraseModalOpen(false)} 
                                    className="w-full text-center bg-[#121212] text-white py-2 rounded-lg transition-all hover:scale-[1.02]"
                                >
                                    Use Original Task
                                </button>
                                <button 
                                    onClick={() => setIsRephraseModalOpen(false)} 
                                    className="w-full text-center bg-[#121212] text-white py-2 rounded-lg transition-all hover:scale-[1.02]"
                                >
                                    Use Rephrased Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AIRephraseModal;
