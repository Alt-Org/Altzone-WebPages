import { classNames } from "@/shared/lib/classNames/classNames";
import { AppRouter } from "./providers/router";

const App = () => {
    return(
        <div id="app" className={classNames("app", {}, [])}>
                <AppRouter />
        </div>

    )};
export default App;
