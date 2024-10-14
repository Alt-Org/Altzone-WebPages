import cls from "./ClanSearchAndView.module.scss";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import { useGetClansQuery } from "@/entities/Clan";
import { useRouter } from "next/navigation";
import { useClientTranslation } from "@/shared/i18n";
import { useEffect, useState } from "react";
import { RoutePaths } from "@/shared/appLinks/RoutePaths";
import { classNames } from "@/shared/lib/classNames/classNames";

const ClansSearchAndViewDesktop = () => {
    const router = useRouter();
    const { t } = useClientTranslation("clan");

    const [currentSearch, setSearch] = useState('');
    const { data: clans, isLoading } = useGetClansQuery({ page: 1, search: currentSearch });

    const onClickToClan = (id: string) => {
        router.push(`${RoutePaths.clan}/${id}`);
    };

    const onClickToSearch = (search: string) => {
        setSearch(convertToQuerySearch(search));
    };

    const onClickSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchField = document.querySelector<HTMLInputElement>("#search");
        if (searchField) {
            onClickToSearch(searchField.value);
        }
    };

    // Temporary way to convert search query value to case-insensitive in front
    const convertToQuerySearch = (search: string): string => {
        // Converts value "testi" to: 'name=".*[tT][eE][sS][tT][iI].*"'
        const cleanValue = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const convertedValue = cleanValue.split('').map(char => `[${char.toLowerCase()}${char.toUpperCase()}]`).join('');
        const querySearch = `name=".*${convertedValue}.*"`;
        return querySearch;
    };

    return (
        <div>
            <form onSubmit={onClickSearch} className={cls.searchField}>
                <input name="search" placeholder={t("search_placeholder")} type="text" id="search"></input>
                <Button
                    type="submit"
                    theme={ButtonTheme.BACKGROUND}
                    size={ButtonSize.M}
                    className={cls.EditClanBtn}
                    square={false}
                >
                    {t('search_btn_text')}
                </Button>
            </form>

            <div className={cls.testContainer}>
                {isLoading ? (
                    <p>{t('loading')}</p>
                ) : (
                    <div className={cls.tableContainer}>
                        <table className={cls.clanList}>
                            <thead>
                                <tr>
                                    <th>{t('clan')}</th>
                                    <th>{t('members')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clans?.data.Clan.map((clan, idx) => {
                                    let bgColor;
                                    switch (idx) {
                                        default:
                                            bgColor = 'rgba(0,0,0,0.6)';
                                            break;
                                    }

                                    return (
                                        <tr key={idx} style={{ backgroundColor: bgColor }} onClick={() => onClickToClan(clan?._id)}>
                                            <td>{clan?.name}</td>
                                            <td>{clan?.playerCount}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClansSearchAndViewDesktop;

const ClansSearchAndViewMobile = () => {
    const router = useRouter();
    const { t } = useClientTranslation("clan");

    const [currentSearch, setSearch] = useState('');
    const [showClanList, setShowClanList] = useState(false);
    const { data: clans, isLoading } = useGetClansQuery({ page: 1, search: currentSearch });

    const onClickToClan = (id: string) => {
        router.push(`${RoutePaths.clan}/${id}`);
    };

    const onClickToSearch = (search: string) => {
        setSearch(convertToQuerySearch(search));
    };

    const onClickSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchField = document.querySelector<HTMLInputElement>("#search");
        if (searchField) {
            onClickToSearch(searchField.value);
        }
    };

    // Temporary way to convert search query value to case-insensitive in front
    const convertToQuerySearch = (search: string): string => {
        // Converts value "testi" to: 'name=".*[tT][eE][sS][tT][iI].*"'
        const cleanValue = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const convertedValue = cleanValue.split('').map(char => `[${char.toLowerCase()}${char.toUpperCase()}]`).join('');
        const querySearch = `name=".*${convertedValue}.*"`;
        return querySearch;
    };
    const mods = {
        [cls.expanded]: showClanList,
        [cls.collapsed]: !showClanList,
    }
    useEffect(() => {
        if (showClanList) {
            document.body.classList.add('body-scroll-disabled');
        } else {
            document.body.classList.remove('body-scroll-disabled');
        }
    }, [showClanList]);

    return (
        <div className={classNames(cls.parent, mods)}>
            {
                <Button
                    className={classNames(cls.mobileToggleClanList, mods)}
                    theme={ButtonTheme.Graffiti}
                    size={ButtonSize.L}
                    onClick={() => setShowClanList(prevState => !prevState)}
                >
                    {!showClanList ? (">") : (t("close_btn"))}
                </Button>
            }
            <div className={classNames(cls.clanListMobile, mods)}>

                <form onSubmit={onClickSearch} className={cls.searchField}>
                    <input name="search" placeholder={t("search_placeholder")} type="text" id="search"></input>
                    <Button
                        type="submit"
                        theme={ButtonTheme.BACKGROUND}
                        size={ButtonSize.M}
                        className={cls.EditClanBtn}
                        square={false}
                    >
                        {t('search_btn_text')}
                    </Button>
                </form>

                <div>
                    {isLoading ? (
                        <p>{t('loading')}</p>
                    ) : (
                        <div className={cls.tableContainer}>
                            <table className={cls.clanList}>
                                <thead>
                                    <tr>
                                        <th>{t('clan')}</th>
                                        <th>{t('members')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clans?.data.Clan.map((clan, idx) => {
                                        let bgColor;
                                        switch (idx) {
                                            default:
                                                bgColor = 'rgba(0,0,0,0.6)';
                                                break;
                                        }

                                        return (
                                            <tr key={idx} style={{ backgroundColor: bgColor }} onClick={() => onClickToClan(clan?._id)}>
                                                <td>{clan?.name}</td>
                                                <td>{clan?.playerCount}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export { ClansSearchAndViewMobile };