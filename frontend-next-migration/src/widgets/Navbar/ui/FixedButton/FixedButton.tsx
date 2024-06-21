import cls from "./FixedButton.module.scss";
import { useFixed } from "../../model/FixedProvider";



export function FixedButton () {

    // @ts-ignore
    const { isFixed, toggleFixed } = useFixed();


    return (
        <div className={cls.fixedButton}>
            <button
                onClick={toggleFixed}
            >
                {isFixed ? '📌' : '📍'}
            </button>
        </div>
    );
}