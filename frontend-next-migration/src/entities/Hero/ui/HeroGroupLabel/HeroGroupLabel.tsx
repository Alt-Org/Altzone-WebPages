import red from "@/shared/assets/images/heros/textBgColors/red.webp";
import darkBlue from "@/shared/assets/images/heros/textBgColors/dark-blue.webp";
import orange from "@/shared/assets/images/heros/textBgColors/orange.webp";
import pink from "@/shared/assets/images/heros/textBgColors/pink.webp";
import cls from './HeroGroupLabel.module.scss';

type HeroGroupLabelProps = Readonly<{
  group: string
}>;
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

enum HeroType {
  FIGHTER = 'FIGHTER',
  MERGER = 'MERGER',
  INTELLECTUAL = 'INTELLECTUAL',
  MIRROR_LOOKER = 'MIRROR_LOOKER'
}

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