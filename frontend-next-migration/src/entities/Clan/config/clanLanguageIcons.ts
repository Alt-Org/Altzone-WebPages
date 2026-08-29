import type { StaticImageData } from 'next/image';
import iconFlagFi from '@/shared/assets/images/clanLogos/CommonFlagFinland.png';

const CLAN_LANGUAGE_ICON_MAP: Record<string, StaticImageData> = {
    fi: iconFlagFi,
};

export const getClanLanguageIcon = (language: string | undefined): StaticImageData | undefined => {
    if (!language) {
        return undefined;
    }

    return CLAN_LANGUAGE_ICON_MAP[language.toLowerCase()];
};
