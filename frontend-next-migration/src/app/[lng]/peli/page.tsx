import {GamePage} from "@/preparedPages/GamePage";
import {Navbar} from "@/widgets/Navbar";

export default function Game () {
    return (
        <>
            <Navbar/>
            <div style={{paddingTop: "20px"}}></div>
            <GamePage/>
        </>
    )
}