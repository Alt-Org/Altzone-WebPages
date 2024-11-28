import { ReactNode, CSSProperties } from 'react';
import cls from './LayoutWithIntro.module.scss';
import { BlurLine } from '@/shared/ui/PageDividers';
import { classNames } from '@/shared/lib/classNames/classNames';

interface LayoutWithIntroProps {
    bgImage: string;
    title: string;
    description: string;
    bottomAdditional?: ReactNode;
    introHeight?: string;
    overlayColor?: string;
    blurLineClass?: string;
    children: ReactNode;
}

const LayoutWithIntro = (props: LayoutWithIntroProps) => {
    const {
        bgImage,
        title,
        description,
        bottomAdditional,
        introHeight = '50vh',
        overlayColor = 'rgba(0, 0, 0, 0.5)',
        blurLineClass = '',
        children,
    } = props;

    return (
        <div className={cls.layout}>
            <div
                className={cls.intro}
                style={
                    {
                        backgroundImage: `url(${bgImage})`,
                        minHeight: introHeight,
                        '--overlay-color': overlayColor,
                    } as CSSProperties
                }
            >
                <div className={cls.introText}>
                    <h1>{title}</h1>
                    <p>{description}</p>
                    {bottomAdditional}
                </div>
                <BlurLine className={classNames(blurLineClass, {}, [cls.blurLine])} />
            </div>

            <div className={cls.content}>{children}</div>
        </div>
    );
};

export default LayoutWithIntro;
