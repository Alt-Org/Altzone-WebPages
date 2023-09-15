import {useRoutes} from "react-router-dom";
import { Suspense } from "react";
import { PageLoader } from "@/widgets/PageLoader";
import {createRoutesFromConfig} from "@/shared/appLinks/createRoutesFromConfig";
import {routeConfig} from "../config/routeConfig";


export const AppRouter = () => {
    const elements = useRoutes(createRoutesFromConfig(routeConfig));
    return (
        <Suspense fallback={<PageLoader />}>
            <div className="page-wrapper">{elements}</div>
        </Suspense>
    );
};