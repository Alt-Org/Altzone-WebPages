import red from "@/shared/assets/images/heros/textBgColors/red_cropped.webp";
import darkBlue from "@/shared/assets/images/heros/textBgColors/dark-blue_cropped.webp";
import orange from "@/shared/assets/images/heros/textBgColors/orange_cropped.webp";
import pink from "@/shared/assets/images/heros/textBgColors/pink_cropped.webp";
import cls from './HeroGroupLabel.module.scss';
import Image from "next/image";
import useSizes from "@/shared/lib/hooks/useSizes";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import { CSSProperties } from "react";

type HeroGroupLabelProps = Readonly<{
  /**
   * Group to which the Hero belongs to
   */
  group: string,
  className?: string,
  style?: CSSProperties
}>;
/**
 * Displays label containing a hero group to which the hero belongs to.
 *
 * Outlook of the label will be defined based on the group value, which should be one of these:
 * - TORJUJAT // RETROFLEKTIO
 * - SULAUTUJAT // KONFLUENSSI
 * - ÄLYLLISTÄJÄT // EGOTISMI
 * - PEILAAJAT // PROJEKTIO
 *
 * If the group has some other value an error text will be displayed instead of the label
 *
 * @returns
 * @param props
 */
export default function HeroGroupLabel(props: HeroGroupLabelProps) {

  const { className, style, group} = props;

  const heroType = convertHeroGroupToHeroType(group);

  if(!heroType)
    return <p>Could not determine the hero type </p>

  const labelText = defineHeroGroupLabelText(heroType);
  const labelBg = defineHeroGroupLabelBg(heroType);

  const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } =useSizes();

  const combinedModCss: Mods = {
    [cls.isMobile]: isMobileSize,
    [cls.isTablet]: isTabletSize,
    [cls.isDesktop]: isDesktopSize,
    [cls.isWidescreen]: isWidescreenSize,
  };

  return(
    <div className={className} style={style}>
      <h3 className={classNames(cls.title, combinedModCss)}>
        {labelBg && <Image 
          className={cls['bg-image']} 
          alt="hero label bg" src={labelBg} 
          priority
          fill
        />}
        <span>{labelText}</span>
      </h3>
    </div>
    
  );
}

/**
 * Type of the hero
 */
enum HeroType {
  FIGHTER = 'FIGHTER',
  MERGER = 'MERGER',
  INTELLECTUAL = 'INTELLECTUAL',
  MIRROR_LOOKER = 'MIRROR_LOOKER'
}

/**
 * Determines text for the provided hero type
 * 
 * @param heroType type of the hero
 * @returns text for the corresponding hero type or empty string if the hero type is unknown
 */
function defineHeroGroupLabelText(heroType: HeroType) {
  switch (heroType) {
    case 'FIGHTER':
      return 'TORJUJAT // RETROFLEKTIO';
    case 'MERGER':
      return 'SULAUTUJAT // KONFLUENSSI';
    case 'INTELLECTUAL':
      return 'ÄLYLLISTÄJÄT // EGOTISMI';
    case 'MIRROR_LOOKER':
      return 'PEILAAJAT // PROJEKTIO';
    default:
      return '';
  }
}
/**
 * Determines the background image corresponding to the hero type
 * 
 * @param heroType type of the hero
 * @returns background image if it exists for the type or null if not
 */
function defineHeroGroupLabelBg(heroType: HeroType) {
  switch (heroType) {
    case 'FIGHTER':
      return red;
    case 'MERGER':
      return pink;
    case 'INTELLECTUAL':
      return darkBlue;
    case 'MIRROR_LOOKER':
      return orange;
    default:
      return null;
  }
}

/**
 * Convert hero group to hero type.
 * 
 * Notice that the group should be one of the following:
 * - TORJUJAT // RETROFLEKTIO
 * - SULAUTUJAT // KONFLUENSSI
 * - ÄLYLLISTÄJÄT // EGOTISMI
 * - PEILAAJAT // PROJEKTIO
 * 
 * @param group hero group to convert
 * @returns corresponding hero type or null if the group is unknown
 */
function convertHeroGroupToHeroType(group: string) {
  switch (group) {
    case 'TORJUJAT // RETROFLEKTIO':
      return HeroType.FIGHTER;
    case 'SULAUTUJAT // KONFLUENSSI':
      return HeroType.MERGER;
    case 'ÄLYLLISTÄJÄT // EGOTISMI':
      return HeroType.INTELLECTUAL;
    case 'PEILAAJAT // PROJEKTIO':
      return HeroType.MIRROR_LOOKER;
    default:
      return null;
  }
}