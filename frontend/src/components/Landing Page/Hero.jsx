import { Link } from "react-router-dom";
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';

function Hero() {
    return (
        <>
            <div className="flex gap-10 h-[60vh] items-center pr-10">
                <div className="w-1/2 flex flex-col items-center">
                    <div className="w-[75%]">
                        <p className="font-bold text-5xl">Not Getting Sh*t Done?</p>
                        <p className="text-2xl mt-2">You're not lazy, it's the mental hurdles of getting started!</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white inline text-lg font-semibold px-4 py-2 rounded-full mt-8">
                        <Link to='/login-signup'>Overcome Your Mental Hurdles <EastOutlinedIcon /></Link>
                    </div>
                </div>
                <div className="bg-gray-300 w-1/2 rounded-lg flex items-center justify-center h-full">
                    <p>Video or picture of dashboard</p>
                </div>
            </div>
        </>
    );
}

export default Hero;
