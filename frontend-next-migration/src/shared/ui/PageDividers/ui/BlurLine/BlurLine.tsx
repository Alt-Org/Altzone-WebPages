import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './BlurLine.module.scss';

interface BlurLineProps {
    className?: string;
}

const BlurLine = (props: BlurLineProps) => {
    const { className = '' } = props;

    return <div className={classNames(cls.blurLine, {}, [className])} />;
};

export default BlurLine;
