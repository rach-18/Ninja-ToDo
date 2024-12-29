import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

function TotalTime() {
    return (
        <div>
            <p className="text-center font-bold text-3xl mb-5">Total Ninja Time</p>
            <div className='bg-gradient-to-br from-blue-500/60 to-purple-600/60 w-1/2 mx-auto py-5 px-8 rounded-lg flex justify-between items-center general-shadow'>
                <div className='text-white'>
                    <p className='font-bold text-4xl'>3h 45m</p>
                    <p>to complete all missions</p>
                </div>
                <button className='bg-white px-5 py-3 rounded-lg shadow-md hover:scale-[1.03] transition-all'><AutoAwesomeOutlinedIcon /> AI Optimize</button>
            </div>
        </div>
    );
}

export default TotalTime
