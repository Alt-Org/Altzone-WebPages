import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./NotFoundPage.module.scss";
import {Navbar} from "@/widgets/Navbar";

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className= '' }: NotFoundPageProps) => {
    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            <Navbar className={cls.navbar} overlayed/>
            <span>Page not found</span>
        </div>
    );
};
