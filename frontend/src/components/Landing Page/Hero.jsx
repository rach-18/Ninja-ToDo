import { Link } from "react-router-dom";
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';

function Hero() {
    return (
        <>
            <div className="relative h-[70vh] flex items-center justify-center py-20 bg-gradient-to-b from-blue-300/30 via-purple-300/30 to-pink-300/30">
                {/* Semi-transparent gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-transparent via-transparent to-[#F9FAFC] pointer-events-none"></div>
                
                <div className="relative flex flex-col items-center">
                    <div className="text-center">
                        <p className="font-bold text-6xl">Not Getting Sh*t Done?</p>
                        <p className="text-2xl mt-2">You're not lazy, it's the mental hurdles of getting started!</p>
                    </div>
                    <div className="mt-8 flex flex-col items-center gap-4">
                        <Link className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white inline text-lg font-semibold px-4 py-2 rounded-full" to='/login-signup'>Start Your First Ninja Mission Now <EastOutlinedIcon /></Link>
                        <p className="text-center bg-white py-1 px-5 rounded-full border border-purple-300">You'll instantly gain clarity on your day and know exactly where to focus your time.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;
