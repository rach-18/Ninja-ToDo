import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="bg-[#121212] text-white pt-10 pb-5">
            <div className='flex flex-col items-center gap-2'>
                <p className='text-4xl font-bold'>Ready to Conquer Your To-Do List?</p>
                <p className='mb-2 w-1/2 text-center'>Join thousands of users who have transformed their productivity with NinjaTodo. Start your journey to getting sh*t done today.</p>
                <Link to='/general-tasks' className='bg-[#757575] px-4 py-2 rounded-full'>Start Getting Sh*t Done <EastOutlinedIcon /></Link>
            </div>
            <div className='px-5 mt-10 text-[#757575] flex justify-between items-center'>
                <div className="bg-white border-2 border-[#757575] inline-block py-1 px-3 rounded-lg">
                    <p className="itim-regular text-xl font-semibold">NINJA TODO</p>
                </div>
                <div className='flex gap-5'>
                    <Link to='#'>Privacy Policy</Link>
                    <Link to='#'>Terms and service</Link>
                    <Link to='#'>Contact Us</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;
