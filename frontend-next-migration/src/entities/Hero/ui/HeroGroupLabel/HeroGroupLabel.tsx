import Image, { StaticImageData } from 'next/image';
import useSizes from '@/shared/lib/hooks/useSizes';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './HeroGroupLabel.module.scss';

type HeroGroupLabelProps = Readonly<{
    labelText: string;
    label: StaticImageData;
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
            <h3 className={classNames(cls.title, combinedModCss)}>
                <Image
                    className={cls['bg-image']}
                    alt="hero label bg"
                    src={label}
                    priority
                    fill
                />
                <span>{labelText}</span>
            </h3>
        </div>
    );
}

// /**
//  * Type of the hero
//  */
// enum HeroType {
//     FIGHTER = 'FIGHTER',
//     MERGER = 'MERGER',
//     INTELLECTUAL = 'INTELLECTUAL',
//     MIRROR_LOOKER = 'MIRROR_LOOKER',
// }
//
// /**
//  * Determines text for the provided hero type
//  *
//  * @param heroType type of the hero
//  * @returns text for the corresponding hero type or empty string if the hero type is unknown
//  */
// function defineHeroGroupLabelText(heroType: HeroType) {
//     switch (heroType) {
//         case 'FIGHTER':
//             return 'TORJUJAT // RETROFLEKTIO';
//         case 'MERGER':
//             return 'SULAUTUJAT // KONFLUENSSI';
//         case 'INTELLECTUAL':
//             return 'ÄLYLLISTÄJÄT // EGOTISMI';
//         case 'MIRROR_LOOKER':
//             return 'PEILAAJAT // PROJEKTIO';
//         default:
//             return '';
//     }
// }
// /**
//  * Determines the background image corresponding to the hero type
//  *
//  * @param heroType type of the hero
//  * @returns background image if it exists for the type or null if not
//  */
// function defineHeroGroupLabelBg(heroType: HeroType) {
//     switch (heroType) {
//         case 'FIGHTER':
//             return red;
//         case 'MERGER':
//             return pink;
//         case 'INTELLECTUAL':
//             return darkBlue;
//         case 'MIRROR_LOOKER':
//             return orange;
//         default:
//             return null;
//     }
// }
//
// /**
//  * Convert hero group to hero type.
//  *
//  * Notice that the group should be one of the following:
//  * - TORJUJAT // RETROFLEKTIO
//  * - SULAUTUJAT // KONFLUENSSI
//  * - ÄLYLLISTÄJÄT // EGOTISMI
//  * - PEILAAJAT // PROJEKTIO
//  *
//  * @param group hero group to convert
//  * @returns corresponding hero type or null if the group is unknown
//  */
// function convertHeroGroupToHeroType(group: string) {
//     switch (group) {
//         case 'TORJUJAT // RETROFLEKTIO':
//             return HeroType.FIGHTER;
//         case 'SULAUTUJAT // KONFLUENSSI':
//             return HeroType.MERGER;
//         case 'ÄLYLLISTÄJÄT // EGOTISMI':
//             return HeroType.INTELLECTUAL;
//         case 'PEILAAJAT // PROJEKTIO':
//             return HeroType.MIRROR_LOOKER;
//         default:
//             return null;
//     }
// }
