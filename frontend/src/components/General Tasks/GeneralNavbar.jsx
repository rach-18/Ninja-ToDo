import { Link } from "react-router-dom";

function GeneralNavbar() {
    return (
        <>
            <div className="flex items-center justify-between px-8 py-5">
                <div className="bg-white border-2 border-black inline-block py-1 px-3 rounded-lg">
                    <p className="itim-regular text-2xl font-semibold">NINJA TODO</p>
                </div>
                <div className="flex gap-5">
                    <Link to='#'>Mental Hurdles</Link>
                    <Link to='#'>Our Solution</Link>
                    <Link to='#'>Get Started</Link>
                </div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-black rounded-full"></div>
                    <p className="text-sm font-semibold">Hi, username!</p>
                </div>
            </div>
        </>
    )
}

export default GeneralNavbar;
