import Image, { StaticImageData } from 'next/image';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './HeroGroupLabel.module.scss';

type HeroGroupLabelProps = Readonly<{
    labelText: string;
    label: StaticImageData | string;
    className?: string;
}>;

export default function HeroGroupLabel(props: HeroGroupLabelProps) {
    const { className, label, labelText } = props;

    return (
        <div className={className}>
            <div className={classNames(cls.label)}>
                <Image
                    className={cls['bg-image']}
                    alt="hero label bg"
                    src={label}
                    priority
                    fill
                />
                <h3 className={cls.labelText}>{labelText}</h3>
            </div>
        </div>
    );
}
