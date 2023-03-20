import {classNames} from "@/shared/lib/classNames/classNames";
// import  {useState} from "react";
// import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button/Button";
import {RoutePath} from "@/app/providers/router/config/routeConfig";
import AboutIcon  from '@/shared/assets/icons/about-20-20.svg';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import cls from "./Sidebar.module.scss";
import {AppLink, AppLinkTheme} from "@/shared/ui/AppLink/AppLink";


interface SidebarProps {
    className?: string;
    isCollapsed: boolean;
}

export const Sidebar = ({ className = '',isCollapsed}: SidebarProps) => {

    // const [collapsed, setCollapsed] = useState(false);
    //
    // const onToggle = () => {
    //     setCollapsed((prev) => !prev);
    // };

    return (
        <div
            data-testid='sidebar'
            className={classNames(cls.Sidebar, { [cls.collapsed]: isCollapsed }, [
                className,
            ])}
        >

            <div className={cls.items}>
                <AppLink
                  theme={AppLinkTheme.PRIMARY}
                  to={RoutePath.main}
                  className={cls.item}
                >
                    {/*<MainIcon className={cls.icon} />*/}
                    <span className={cls.link}>
                     <span>Main  Page</span>
                    </span>
                </AppLink>

                <AppLink
                  theme={AppLinkTheme.PRIMARY}
                  to={RoutePath.about}
                  className={cls.item}
                >
                    {/*<AboutIcon className={cls.icon} />*/}
                    <span
                      className={cls.link}>
                      About Page
                    </span>
                </AppLink>
            </div>

        </div>
    );
};
