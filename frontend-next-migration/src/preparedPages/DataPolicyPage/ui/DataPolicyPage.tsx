import { ReactNode } from 'react';
import cls from './DataPolicyPage.module.scss';

export type Props = {
    title: string;
    text: ReactNode;
};

const DataPolicyPage = (props: Props) => {
    const { title, text } = props;

    return (
        <main className={cls.main}>
            <div className={cls.container}>
                <h1>{title}</h1>
                {/* <div className={cls.text}>{text}</div> */}
                {typeof text === 'string'
                    ? text
                          .split('\n')
                          .filter((line) => line.trim() !== '')
                          .map((item, index) => <p key={index}>{item}</p>)
                    : text}
            </div>
        </main>
    );
};

export default DataPolicyPage;
