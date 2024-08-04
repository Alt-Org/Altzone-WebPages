import cls from "./ClanSearchAndView.module.scss";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import { GetClansResponse, useGetClansQuery } from "@/entities/Clan";
import { useParams, useRouter } from "next/navigation";
import { useClientTranslation } from "@/shared/i18n";
import { useState } from "react";
import { RoutePaths } from "@/shared/appLinks/RoutePaths";

const ClansSearchAndViewDesktop = () => {
    const params = useParams();
    const router = useRouter();
    const lng = params.lng as string;
    const { t } = useClientTranslation(lng, "clan");

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
            console.log("searchField.value: ", searchField.value);
            onClickToSearch(searchField.value);
        }
    };

    // Temporary way to convert search query value to case-insensitive in front
    const convertToQuerySearch = (search: string): string => {
        // Converts value "testi" to: 'name=".*[tT][eE][sS][tT][iI].*"'
        const cleanValue = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const convertedValue = cleanValue.split('').map(char => `[${char.toLowerCase()}${char.toUpperCase()}]`).join('');
        const querySearch = `name=".*${convertedValue}.*"`;
        console.log("querySearch: ", querySearch);
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
                    {t('find')}
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
    );
};

export default ClansSearchAndViewDesktop;