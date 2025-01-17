import Image from 'next/image';
import clanLogo from '@/shared/assets/images/clanLogos/temp-clanlogo.png';
import styles from './ClanInfoTitle.module.scss';

interface ClanInfoTitleProps {
    name: string;
    ageRange: string;
    playerCount: number;
    maxPlayers: number;
    points: number;
    labels: string[];
}

/**
 * ClanInfoTitle component for rendering clan information.
 *
 * @param {ClanInfoTitleProps} props - The properties for the ClanInfoTitle component.
 * @param {string} props.name - The name of the clan.
 * @param {string} props.ageRange - The age range of the clan.
 * @param {number} props.playerCount - The current number of players in the clan.
 * @param {number} props.maxPlayers - The maximum number of players in the clan.
 * @param {number} props.points - The points of the clan.
 * @param {string[]} props.labels - The labels associated with the clan.
 * 
 * @returns {JSX.Element} - The rendered ClanInfoTitle component.
 *
 * @example
 * <ClanInfoTitle
 *   name="Clan Name"
 *   ageRange="18+"
 *   playerCount={8}
 *   maxPlayers={10}
 *   points={1244}
 *   labels={['label1', 'label2']}
 * />
 */
const ClanInfoTitle = ({ name, ageRange, playerCount, points, labels }: ClanInfoTitleProps) => {


            return (
                <div className={styles.clanInfo}>
                    <div className={styles.header}>
                        <div className={styles.titleSection}>
                            <div className={styles.titleRow}>
                                <h2 className={styles.title}>{name}</h2>
                                <h2 className={styles.tag}>{ageRange}</h2>
                            </div>
                        </div>
                        <div className={styles.contentRow}>
                            <Image src={clanLogo} alt={'clan logo'} className={styles.logo} />
                            <div className={styles.labels}>
                                {labels.map((label, index) => (
                                    <span key={index} className={styles.label}>
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <span className={styles.members}>
                            Members {playerCount} /10
                        </span>
                        <div className={styles.points}>
                            <p>{points}</p>
                            <span className={styles.crown}>♛</span>
                        </div>
                    </div>
                </div>
    );
};

export default ClanInfoTitle;