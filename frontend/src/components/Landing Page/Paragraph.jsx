import { Link } from "react-router-dom";

function Paragraph({ title, para }) {
    return (
        <>
            <div className="paragraph text-center mt-20">
                <div className="w-5/6 mx-auto py-10">
                    <p className="font-bold text-4xl text-center block">{title}</p>
                    <p className="my-5">{para}</p>
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
