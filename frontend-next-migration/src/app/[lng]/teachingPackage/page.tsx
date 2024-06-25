import { TeachingPackagePage } from "@/preparedPages/TeachingPackagePage";
import { useServerTranslation } from "@/shared/i18n";
import { Metadata } from "next";
import {makeTeachingSectionsWithI18n} from "@/entities/PresentationPackages";

type Props = {
    params: { lng: string }
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { t } = await useServerTranslation(params.lng, 'teachingPackage');

    return {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }
}

export default async function DefaultPage({ params }: Props){

    const { t } = await useServerTranslation(params.lng, 'teachingPackage');

    const sections = makeTeachingSectionsWithI18n(t);


    // const sections =  [
    //     { id: 'section1', ["t-label"]: t('demo-title')  , description: t('demo-description')},
    //     { id: 'section2', label: t('implementation-title') , description: t('implementation-description')},
    // ]
    //
    // const sections =  [
    //     { id: 'section1', label: t('demo-title')  , description: t('demo-description')},
    //     { id: 'section2', label: t('implementation-title') , description: t('implementation-description')},
    //     { id: 'section3', label: 'Mitä Pelitaide on?' },
    //     { id: 'section4', label: 'Visuaalinen vaikuttuvuus' },
    //     { id: 'section5', label: 'Toiminnallinen vaikuttavuus' },
    //     { id: 'section6', label: 'Yhteydet pelin ulkopuolelle' },
    //     { id: 'section7', label: 'ALT Zone -verkkopeli' },
    //     { id: 'section8', label: 'Erilaisten pelaajien yhteinen liittouma' },
    //     { id: 'section9', label: 'Pelihahmot & niiden kehittäminen' },
    //     { id: 'section10', label: 'Pelimekaniikka' },
    //     { id: 'section11', label: 'Nuorisotyö & pelitaiteen opetus kouluissa' },
    //     { id: 'section12', label: 'Pelitaiteen kirjallisuutta' },
    //     { id: 'section13', label: 'PRG - Psyche’s Royale Gaming ry' },
    // ]


    return(
                <TeachingPackagePage
                    sections = {sections}
                />
            )
};