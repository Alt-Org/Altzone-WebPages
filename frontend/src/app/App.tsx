import { classNames } from "@/shared/lib/classNames/classNames";
import { AppRouter } from "./providers/router";
import {ScrollTop} from "@/features/ScrollTop";




const App = () => {
    return(
        <div id="app" className={classNames("app", {}, [])}>
                <AppRouter />
                <ScrollTop/>
        </div>

    )};
export default App;
