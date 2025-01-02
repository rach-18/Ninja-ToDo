import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <div className="flex items-center justify-between px-8 py-5 shadow-sm">
                <div className="bg-white border-2 gradient-border inline-block py-1 px-3 rounded-lg">
                    <p className="itim-regular text-2xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">NINJA TODO</p>
                </div>
                <div className="flex gap-5 items-center" >
                    <Link className="bg-purple-600 px-4 py-2 rounded-full text-white shadow-lg hover:scale-105 transition-all" to='/login-signup'>Get Started</Link>
                    <Link to='#'>Provide Feedback</Link>
                </div>
                {/* <div className="flex gap-5">
                    <Link to='#'>Mental Hurdles</Link>
                    <Link to='#'>Our Solution</Link>
                    <Link to='#'>Get Started</Link>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-black rounded-full"></div>
                    <p className="text-sm font-semibold">Hi, username!</p>
                </div> */}
            </div>
        </>
    );
}

export default Navbar;
