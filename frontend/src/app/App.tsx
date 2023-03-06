import { classNames } from "@/shared/lib/classNames/classNames";
import { AppRouter } from "./providers/router";
import {Suspense, useEffect} from "react";

const App = () => {

    return(
        <div className={classNames("app", {}, [])}>
            <Suspense fallback="">
                <div className="content-page">
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    )};
export default App;
