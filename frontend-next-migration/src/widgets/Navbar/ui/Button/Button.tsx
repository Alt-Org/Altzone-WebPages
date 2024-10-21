import cls from "./Button.module.scss";
import { useFixedAndCollapsed } from "../../model/FixedAndCollapsedProvider";
import {classNames} from "@/shared/lib/classNames/classNames";

type Props = {
    className?: string;
}


export function CollapsedButton (props: Props) {

    const {
        className = ''
    } = props;

    const { isCollapsed, toggleCollapsed } = useFixedAndCollapsed();

    return (
        <div className={classNames(cls.fixedButton, {}, [className])}>
            <button
                onClick={toggleCollapsed}
            >
                {isCollapsed ? '<' : '>'}
            </button>
        </div>
    );
}

export function FixedButton (props: Props) {

    const {
        className = ''
    } = props;

    const { isFixed, toggleFixed } = useFixedAndCollapsed();
    
    return (
        <div className={classNames(cls.fixedButton, {}, [className])}>
            <button
                onClick={toggleFixed}
            >
                {isFixed ? '📍' : '📌'}
            </button>
        </div>
    );
}