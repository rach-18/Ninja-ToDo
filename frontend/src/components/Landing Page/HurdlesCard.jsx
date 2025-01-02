import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

function HurdlesCard({ icon, title, def }) {
    return (
        <>
            <div className="bg-white shadow-lg w-[30%] rounded-lg p-5 flex flex-col">
                {/* <AccessTimeOutlinedIcon sx={{fontSize: 60}} /> */}
                {icon}
                <p className='font-bold text-xl mt-3 mb-1'>{title}</p>
                <p>{def}</p>
            </div>
        </>
    );
}

export default HurdlesCard;
