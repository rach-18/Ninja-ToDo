import { Link } from "react-router-dom";
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';

function Paragraph({ title, para }) {
    return (
        <>
            <div className="paragraph text-center mt-20">
                <div className="w-5/6 mx-auto py-10">
                    {
                        title === "What is Poor Planning?" && (
                            <div className="text-white rounded-full inline mb-5">
                                <EventNoteOutlinedIcon sx={{
                                    fontSize: 60, 
                                    backgroundImage: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5), rgba(236, 72, 153, 0.5))', 
                                    padding: 1.5, 
                                    borderRadius: 5, 
                                    marginBottom: 2
                                }} />
                            </div>
                        )
                    }
                    <p className="font-bold text-4xl text-center block">{title}</p>
                    <p className="my-5 w-5/6 mx-auto">{para}</p>
                    {
                        title === "Sounds Familiar?" && (
                            <Link className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white inline text-lg px-4 py-2 rounded-full mt-8" to="#">Learn More About Mental Hurdles</Link>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Paragraph;
