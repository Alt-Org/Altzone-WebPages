import cls from "./DataPolicyPage.module.scss";
import {ReactNode} from "react";

type Props = {
    title: string;
    text: ReactNode;
}

const DataPolicyPage = (props: Props) => {

    const { title, text } = props;

    return (
        <main className={cls.main}>
            <div className={cls.container}>
                <h1>
                    {title}
                </h1>
                <div className={cls.text}>
                    {text}
                </div>
            </div>
        </main>
    )
}

export default DataPolicyPage;
