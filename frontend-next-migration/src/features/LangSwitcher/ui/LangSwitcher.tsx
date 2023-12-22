import {ChangeEvent} from "react";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { classNames } from "@/shared/lib/classNames/classNames";

type LangSwitcherProps = {
    className?: string;
}

export const LangSwitcher = ({ className = "" }: LangSwitcherProps) => {
    const router = useRouter();
    const currentPathname = usePathname();

    // const { t, i18n: { changeLanguage, language: currentLocale } } = useClientTranslation();
    const { t, i18n: {language } } = useTranslation();

    const handleChangeLanguage = async (newLanguage: AppLanguage) => {
        router.push(currentPathname.replace(`/${language}`, `/${newLanguage}`));
        router.refresh();
    };

    const handleSelectChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value as AppLanguage;
        await handleChangeLanguage(selectedLanguage);
    };

    return (
        <>
            <select
                value={language}
                onChange={handleSelectChange}
                className={classNames("", {}, [className])}
            >
                <option value="fi"> {t('finnish')}</option>
                <option value="en">{t('english')}</option>
                <option value="ru">{t('russian')}</option>
            </select>
        </>
    );
};

