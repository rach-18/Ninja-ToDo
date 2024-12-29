import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

function HurdlesCard({ icon, title, def }) {
    return (
        <>
            <div className="bg-purple-300/20 w-[30%] rounded-lg border-2 border-purple-300 border-dashed p-5 flex flex-col items-center text-center">
                {/* <AccessTimeOutlinedIcon sx={{fontSize: 60}} /> */}
                {icon}
                <p className='font-bold text-xl mt-3 mb-1'>{title}</p>
                <p>{def}</p>
            </div>
        </>
    );
}

export default HurdlesCard;
