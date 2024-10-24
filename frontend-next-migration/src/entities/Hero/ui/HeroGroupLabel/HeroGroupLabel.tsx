import Image, { StaticImageData } from 'next/image';
import useSizes from '@/shared/lib/hooks/useSizes';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './HeroGroupLabel.module.scss';

type HeroGroupLabelProps = Readonly<{
    labelText: string;
    label: StaticImageData | string;
    className?: string;
}>;

export default function HeroGroupLabel(props: HeroGroupLabelProps) {
    const { className, label, labelText } = props;

    const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } = useSizes();

    const combinedModCss: Mods = {
        [cls.isMobile]: isMobileSize,
        [cls.isTablet]: isTabletSize,
        [cls.isDesktop]: isDesktopSize,
        [cls.isWidescreen]: isWidescreenSize,
    };

    return (
        <div className={className}>
            <div className={classNames(cls.title, combinedModCss)}>
                <Image
                    className={cls['bg-image']}
                    alt="hero label bg"
                    src={label}
                    priority
                    fill
                />
                <h3>{labelText}</h3>
            </div>
        </div>
    );
}
