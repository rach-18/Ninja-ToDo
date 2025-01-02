import Hero from "./Hero";
import Navbar from "./Navbar";
import Paragraph from "./Paragraph";
import Hurdles from "./Hurdles";
import Features from "./Features";
import Footer from "../Footer/Footer";

function LandingPage() {
    return (
        <>
            <Navbar />
            <div className="landing-page">
                <Hero />
                <Paragraph 
                    title="What is Poor Planning?" 
                    para="Poor planning is the hidden barrier that makes even capable individuals struggle to start and finish tasks."    
                />
                <Hurdles />
                <Paragraph
                    title="Sounds Familiar?"
                    para="If you've ever felt stuck, unable to start important tasks despite knowing their importance, you're not alone. These mental hurdles affect millions, but they can be overcome."
                />
                <Features />
            </div>
            <Footer />
        </>
    );
}

export default LandingPage;
