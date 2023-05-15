import {memo, useEffect} from "react";
import {useNavigate,useLocation} from "react-router-dom";
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./NavGoBackButton.module.scss"

interface NavGoBackButtonProps {
    className?: string;
}

export const NavGoBackButton = memo(({ className = ''}: NavGoBackButtonProps) => {

    const navigate = useNavigate();

    const handleGoingBack = () =>  navigate(-1);

    return <div className={classNames(cls.NavGoBackButton,{},[className])}  onClick={handleGoingBack}> <span>{`<`} Uutiset</span></div>;
});