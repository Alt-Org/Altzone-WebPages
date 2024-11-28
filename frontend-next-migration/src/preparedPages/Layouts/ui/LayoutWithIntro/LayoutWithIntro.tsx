import { ReactNode } from 'react';
import cls from './LayoutWithIntro.module.scss';
import { Navbar } from '@/widgets/Navbar';

interface LayoutWithIntroProps {
    bgImage: string;
    title: string;
    description: string;
    introHeight?: string;
    children: ReactNode;
}

const LayoutWithIntro = (props: LayoutWithIntroProps) => {
    const { bgImage, title, description, introHeight = '50vh', children } = props;

    return (
        <div className={cls.layout}>
            {/*<Navbar />*/}
            <div
                className={cls.intro}
                style={{ backgroundImage: `url(${bgImage})`, height: introHeight }}
            >
                <div className={cls.introText}>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
            </div>
            <div className={cls.content}>{children}</div>
        </div>
    );
};

export default LayoutWithIntro;
