import {memo, useEffect, useState} from "react";
import {Trans, Translation, useTranslation} from "react-i18next";
// import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import {LS_KEYS} from "@/shared/const/env/LS_KEYS";
import {Language} from "@/shared/i18n/settings";
import {classNames} from "@/shared/lib/classNames/classNames";
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";


interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = ({ className= '', short = true }: LangSwitcherProps) => {



    const { t, i18n: {changeLanguage, language} } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(language)

    const handleChangeLanguage = () => {
        const newLanguage = currentLanguage === Language.ENGLISH ? Language.FINNISH : Language.ENGLISH;
        setCurrentLanguage(newLanguage);
        changeLanguage(newLanguage);
    }

    return (
        <>
        <Button
            className={classNames("", {}, [className])}
            theme={ButtonTheme.CLEAR}
            onClick={handleChangeLanguage}
        >
          change language {language}
        </Button>
        </>
    );
};


// const toggle = () => {
//     // eslint-disable-next-line max-len
//     const newLanguage =
//         i18n.language === Language.RUSSIAN
//             ? Language.ENGLISH
//             : Language.RUSSIAN;
//     i18n.changeLanguage(newLanguage);
//     localStorage.setItem(LS_KEYS.LOCAL_STORAGE_LANGUAGE_KEY, newLanguage);
// };
//
// useEffect(()=>{
//     console.log(i18n.language)
// },[i18n])


// console.log(true)
//
// const { t, i18n:{language,changeLanguage} } = useTranslation("translation");
//
//
// const [currentLanguage, setCurrentLanguage] = useState(language)
//
//
// const toggle = async () => {
//     let newLanguage;
//
//     // newLanguage = Language.FINNISH
//
//     switch (language) {
//         case Language.RUSSIAN:
//             newLanguage = Language.ENGLISH;
//             break;
//         case Language.ENGLISH:
//             newLanguage = Language.FINNISH;
//             break;
//         case Language.FINNISH:
//             newLanguage = Language.RUSSIAN;
//             break;
//         default:
//             newLanguage = Language.ENGLISH;
//     }
//      changeLanguage(newLanguage);
//      // i18n.reloadResources()
//     // console.log(i18n.getResourceBundle('en', 'translation'));  // получить переводы для английского языка и пространства имен 'translation'
//     // console.log(i18n.exists('short_language'));  // вернет true, если ключ 'short_language' существует
//     // console.log(i18n.t('short_language'));
//
//     // console.log(i18n.store)
//     localStorage.setItem(LS_KEYS.LOCAL_STORAGE_LANGUAGE_KEY, newLanguage);
//
//     // i18n.reloadResources()
// };