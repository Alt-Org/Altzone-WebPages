import { ClanLabel } from '../enum/clanLabel.enum';
import type { StaticImageData } from 'next/image';
import iconSpammer from '@/shared/assets/images/clanLabels/ClanLabelSpammer.png';
import iconHumorous from '@/shared/assets/images/clanLabels/ClanLabelHumorous.png';
import iconAnimalLovers from '@/shared/assets/images/clanLabels/ClanLabelAnimalLovers.png';

const CLAN_LABEL_ICON_MAP: Partial<Record<ClanLabel, StaticImageData>> = {
    [ClanLabel.SPÄMMÄÄJÄT]: iconSpammer,
    [ClanLabel.HUUMORINTAJUISET]: iconHumorous,
    [ClanLabel.ELÄINRAKKAAT]: iconAnimalLovers,
};

// Temporary fallback icon for labels without a specific icon
const CLAN_LABEL_FALLBACK_ICON = iconSpammer;

export const getClanLabelIcon = (label: string) =>
    CLAN_LABEL_ICON_MAP[label as ClanLabel] ?? CLAN_LABEL_FALLBACK_ICON;
