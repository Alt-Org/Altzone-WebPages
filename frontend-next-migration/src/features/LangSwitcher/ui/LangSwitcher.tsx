import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";

type LangSwitcherProps = {
    className?: string;
}

export const LangSwitcher = ({ className = "" }: LangSwitcherProps) => {
    const router = useRouter();
    const currentPathname = usePathname();

    // const { t, i18n: { changeLanguage, language: currentLocale } } = useClientTranslation();
    const { t, i18n: {language } } = useTranslation();

    const handleChangeLanguage = (newLanguage: AppLanguage) => {
        window.location.href = currentPathname.replace(`/${language}`, `/${newLanguage}`);

        // router.push(currentPathname.replace(`/${language}`, `/${newLanguage}`));

        // setTimeout(()=>{
        //     window.location.reload();
        // },400)
    };

    // router.refresh();
    // window.location.reload();\

    // window.reload();
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value as AppLanguage;
        handleChangeLanguage(selectedLanguage);
    };

    return (
            <select
                data-testid="language-switcher"
                value={language}
                onChange={handleSelectChange}
                className={classNames("", {}, [className])}
            >
                <option value="fi"> {t('finnish')}</option>
                <option value="en">{t('english')}</option>
                {/*<option value="ru">{t('russian')}</option>*/}
            </select>
    );
};

