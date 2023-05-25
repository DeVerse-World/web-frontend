import { TabHeaderBar } from "../../components/common/TabHeader";

function Leaderboard() {
    return (
        <div className="h-full">
            <TabHeaderBar data={[
                { href: "/alpha", label: "Play" },
                { href: "/alpha/rewards", label: "Rewards" },
                { href: "/alpha/leaderboard", label: "Leaderboard" },
            ]} />
            <div id="section-content" className="flex justify-center items-center text-white p-4" >
                <h1 >Coming soon</h1>
            </div>
        </div>
    )
}

export default Leaderboard;