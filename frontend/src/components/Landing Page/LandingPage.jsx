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
            <div className="w-11/12 mx-auto my-10">
                <Hero />
                <Paragraph 
                    title="What are Mental Hurdles?" 
                    para="Mental hurdles are psychological barriers that prevent you from starting tasks, even when you know they're important. They're not a sign of laziness, but a common challenge that even the most capable individuals face."    
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
