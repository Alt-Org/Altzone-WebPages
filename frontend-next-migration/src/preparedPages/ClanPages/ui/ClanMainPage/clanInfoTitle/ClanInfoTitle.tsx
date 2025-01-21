'use client';
import Image from 'next/image';
import clanLogo from '@/shared/assets/images/clanLogos/temp-clanlogo.png';
import label from '@/shared/assets/images/labels.svg';
import cls from './ClanInfoTitle.module.scss';
import { useRouter } from 'next/navigation';

interface ClanInfoTitleProps {
    id: string;
    name: string;
    ageRange: string;
    playerCount: number;
    points: number;
    labels: string[];
}

/**
 * ClanInfoTitle component displays information about a clan and navigates to the clan's page when clicked.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.id - The unique identifier of the clan.
 * @param {string} props.name - The name of the clan.
 * @param {string} props.ageRange - The age range of the clan members.
 * @param {number} props.playerCount - The number of players in the clan.
 * @param {number} props.points - The points scored by the clan.
 * @param {string[]} props.labels - The labels associated with the clan.
 *
 * @returns {JSX.Element} The clanInfoTitle component.
 */
const ClanInfoTitle = ({ id, name, ageRange, playerCount, points, labels }: ClanInfoTitleProps) => {
    const router = useRouter();
    // when clan is clicked it redirects to that particular clan information
    const handleClanClick = () => {
        router.push(`/clans/${id}`);
    };
    return (
        <div
            className={cls.clanInfo}
            onClick={handleClanClick}
            role="button"
        >
            <div className={cls.titleContainer}>
                <h1 className={cls.title}>{name}</h1>
            </div>
            <div className={cls.header}>
                <Image
                    src={clanLogo}
                    alt={'clan logo'}
                    className={cls.logo}
                />
                <div className={cls.labels}>
                    <div><Image src={label} alt={'labels'} className={cls.label}/></div>
                    <div><Image src={label} alt={'labels'} className={cls.label}/></div>
                    <div><Image src={label} alt={'labels'} className={cls.label}/></div>
                    <div><Image src={label} alt={'labels'} className={cls.label}/></div>
                </div>
            </div>
            <div className={cls.footer}>
                <div className={cls.members}>
                    Members
                    <div className={cls.play}>{playerCount} /10</div>
                </div>

                <div className={cls.points}>
                    <p>{points}</p>
                    <span className={cls.crown}>♛</span>
                </div>
            </div>
        </div>
    );
};

export default ClanInfoTitle;
