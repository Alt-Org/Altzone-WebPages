'use client';
import ClanInfoTitle from './clanInfoTitle/clanInfoTitle';
import { useGetClansQuery } from '@/entities/Clan';
import { Container } from '@/shared/ui/Container';
import cls from './ClanMainPage.module.scss';
/**
 * ClanMainPage component for rendering the main page with clan information.
 *
 * @param {object} props - The properties for the ClanMainPage component.
 * @param {React.ReactNode} props.children - The children components to be rendered inside the ClanMainPage.
 *
 * @returns {JSX.Element} - The rendered ClanMainPage component.
 *
 * @example
 * <ClanMainPage>
 *   <SomeChildComponent />
 * </ClanMainPage>
 */

const ClanMainPage = ({ children }: any) => {
    const { data, isLoading, error } = useGetClansQuery({});

    // Extracting the clans array from the data object.
    const clansArray = data?.data?.Clan || [];


    return (
        <div className={cls.Wrapper}>
            <Container className={cls.Container}>
                <div className={cls.ClansViewMain}>{children}</div>
                {/* this just temporary to show the clan info in the ClanMain page for now when all the components are ready we will remove this. */}
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error loading clans</p>
                ) : clansArray && clansArray.length > 0 ? (
                    clansArray.map((clan: any) => (
                        <ClanInfoTitle
                            key={clan._id}
                            name={clan.name}
                            ageRange={clan.ageRange}
                            playerCount={clan.playerCount}
                            // maxPlayers={clan.maxPlayers}
                            points={clan.points}
                            labels={clan.labels}
                            id={clan._id}
                        />
                    ))
                ) : (
                    <p>No clans found</p>
                )}
            </Container>
        </div>
    );
};

export default ClanMainPage;
