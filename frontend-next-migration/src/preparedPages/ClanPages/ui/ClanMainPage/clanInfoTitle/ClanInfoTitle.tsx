'use client';
import Image from 'next/image';
import clanLogo from '@/shared/assets/images/clanLogos/temp-clanlogo.png';
import styles from './ClanInfoTitle.module.scss';
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
 * @returns {JSX.Element} The ClanInfoTitle component.
 */
const ClanInfoTitle = ({ id, name, ageRange, playerCount, points, labels }: ClanInfoTitleProps) => {
    const router = useRouter();
    // when clan is clicked it redirects to that particular clan information
    const handleClanClick = () => {
        router.push(`/clans/${id}`);
    };
    return (
        <div
            className={styles.clanInfo}
            onClick={handleClanClick}
            role="button"
        >
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>{name}</h1>
            </div>
            <div className={styles.header}>
                <Image
                    src={clanLogo}
                    alt={'clan logo'}
                    className={styles.logo}
                />
                <div className={styles.labels}>
                    <div>18+</div>
                    <div>18+</div>
                    <div>18+</div>
                    <div>18+</div>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.members}>
                    Members
                    <div className={styles.play}>{playerCount} /10</div>
                </div>

                <div className={styles.points}>
                    <p>{points}</p>
                    <span className={styles.crown}>♛</span>
                </div>
            </div>
        </div>
    );
};

export default ClanInfoTitle;
