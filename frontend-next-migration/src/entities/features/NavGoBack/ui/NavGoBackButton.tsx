import { useRouter } from 'next/router';
import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./NavGoBackButton.module.scss";

interface NavGoBackButtonProps {
    className?: string;
}

export const NavGoBackButton = memo(({ className = ''}: NavGoBackButtonProps) => {
    const router = useRouter();

    const handleGoingBack = () => {
        router.back();
    };

    return (
        <div className={classNames(cls.NavGoBackButton, {}, [className])} onClick={handleGoingBack}>
            <span>{`<`} Uutiset</span>
        </div>
    );
});
