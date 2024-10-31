import { StaticImageData } from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './HeroGroupLabel.module.scss';

type HeroGroupLabelProps = Readonly<{
    labelText: string;
    label: StaticImageData | string;
    className?: string;
    labelTextClassName?: string;
}>;

export default function HeroGroupLabel(props: HeroGroupLabelProps) {
    const { className = '', label, labelText, labelTextClassName = '' } = props;
    const backgroundImage =
        label && typeof label === 'object' && label.src
            ? `url(${label.src})`
            : 'url(/path/to/default/image.png)';
    return (
        <div
            style={{ backgroundImage }}
            className={classNames(cls.container, {}, [className])}
        >
            <h3 className={classNames(cls.labelText, {}, [labelTextClassName])}>{labelText}</h3>
        </div>
    );
}
