import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { PageLoader } from "@/widgets/PageLoader";
import { routeConfig } from "../config/routeConfig";

export const AppRouter = () => (
    <Routes>
        {Object.values(routeConfig).map(({ element, path }) => (
            <Route
                key={path}
                path={path}
                element={
                    <Suspense fallback={<PageLoader />}>
                        <div className="page-wrapper">{element}</div>
                    </Suspense>
                }
            />
        ))}
    </Routes>
);
