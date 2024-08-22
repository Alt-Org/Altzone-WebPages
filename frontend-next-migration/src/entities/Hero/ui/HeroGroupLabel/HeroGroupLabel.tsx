import red from "@/shared/assets/images/heros/textBgColors/red.webp";
import darkBlue from "@/shared/assets/images/heros/textBgColors/dark-blue.webp";
import orange from "@/shared/assets/images/heros/textBgColors/orange.webp";
import pink from "@/shared/assets/images/heros/textBgColors/pink.webp";
import cls from './HeroGroupLabel.module.scss';


type HeroGroupLabelProps = Readonly<{
  /**
   * Group to which the Hero belongs to
   */
  group: string
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
 * @param Props
 * @returns 
 */
export default function HeroGroupLabel({ group }: HeroGroupLabelProps) {
  const heroType = convertHeroGroupToHeroType(group);

  if(!heroType)
    return <p>Could not determine the hero type </p>

  const labelText = defineHeroGroupLabelText(heroType);
  const labelBg = defineHeroGroupLabelBg(heroType);

  return(
    <div className={cls.heroGroupLabel}>
      <h3
          className={cls.heroGroupLabelTitle}
          style={labelBg ? {backgroundImage: `url(${labelBg.src})`} : undefined} 
      >
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