'use client';
import { ReactNode } from 'react';
import cls from './ComingPage.module.scss';

export type Props = {
    title: string;
    text: ReactNode;
};

const ComingPage = (props: Props) => {
    const { title, text } = props;

    return (
        <main className={cls.main}>
            <div className={cls.container}>
                <h1>{title}</h1>
                <div className={cls.text}>{text}</div>
            </div>
        </main>
    );
};

export default ComingPage;
