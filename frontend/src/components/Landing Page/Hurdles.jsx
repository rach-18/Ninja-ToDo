import HurdlesCard from "./HurdlesCard";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import ScatterPlotOutlinedIcon from '@mui/icons-material/ScatterPlotOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';

function Hurdles() {
    return (
        <>
            <div className="mt-20">
                <p className="font-bold text-4xl text-center block">Consequences of Poor Planning</p>
                <div className="mt-10 flex gap-5 flex-wrap justify-center">
                    <HurdlesCard icon={<AccessTimeOutlinedIcon sx={{fontSize: 50}} />} title="Procrastination" def="Unclear tasks and unrealistic time estimates create hesitation and confusion, leading to delays or missed deadlines." />
                    <HurdlesCard icon={<LayersOutlinedIcon sx={{fontSize: 50}} />} title="Feeling Overwhelmed" def="Multiple tasks compete for your attention, causing overwhelm and stress as you struggle to decide where to begin." />
                    <HurdlesCard icon={<HelpOutlineOutlinedIcon sx={{fontSize: 50}} />} title="Feeling Lost" def="Big, undefined tasks make it hard to know where to start, preventing you from making meaningful strides." />
                    <HurdlesCard icon={<PauseOutlinedIcon sx={{fontSize: 50}} />} title="Feeling Stuck and Stagnant" def="Without visible progress or clear ways to improve, you feel trapped, unmotivated, and uncertain if your efforts are making a difference." />
                    <HurdlesCard icon={<ScatterPlotOutlinedIcon sx={{fontSize: 50}} />} title="Scattered Focus" def="Mixing tasks from work, home, and side hustle leaves you feeling disorganized and unable to concentrate on what truly matters." />
                    <HurdlesCard icon={<ListOutlinedIcon sx={{fontSize: 50}} />} title="Feeling Disorganized" def="Scattered notes, files, and ideas leave you feeling disorganized and frustrated, making it hard to keep everything aligned with your tasks." />
                </div>
            </div>
        </>
    );
}

export default Hurdles;
