import {CSSProperties, memo, useState} from "react";
import cls from "./NavbarTouch.module.scss";
import {classNames} from "@/shared/lib/classNames/classNames";
import navLogo from "@/shared/assets/images/altLogo.png";
import {Sidebar} from "@/widgets/Sidebar";

interface NavbarTouchProps {
    overlayed ?: boolean;
    marginTop?: number;
    onBurgerButtonClick?: (isMenuOpen: boolean) => void;
}

export default memo(( props : NavbarTouchProps) => {

    const {
        overlayed,
        marginTop,
    } = props;

    const style = marginTop
        ? ({ "marginTop": `${marginTop}px` } as CSSProperties)
        : {};

    const mods: Record<string, boolean> = {
        [cls.overlayed]: overlayed,
    } as Record<string, boolean>;


    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleBurgerButtonClick = () => {
        // if (onBurgerButtonClick) {
        //     onBurgerButtonClick(isMenuOpen);
        // }
        setIsMenuOpen((prevState) => !prevState);
    };

    const currentButton = isMenuOpen ? 'Х' : '☰'

        return (
            <nav className={classNames(cls.Navbar, mods)} style={style}>
                <div className={cls.NavbarTouch}>
                    <div className={cls.NavbarTouch__left} onClick={handleBurgerButtonClick}>{currentButton}</div>
                    <img src={navLogo} alt="nav logo" className={cls.navLogo + ' ' + cls.NavbarTouch__center}
                         // loading='lazy'
                    />
                </div>
                <Sidebar isCollapsed={!isMenuOpen}/>
            </nav>
        )

});
