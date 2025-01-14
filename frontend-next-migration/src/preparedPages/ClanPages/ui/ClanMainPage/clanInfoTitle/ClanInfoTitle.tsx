import Image from 'next/image';
import clanLogo from '@/shared/assets/images/clanLogos/temp-clanlogo.png';
import styles from './ClanInfoTitle.module.scss';

const ClanInfoTitle = ({ clanId }) => {
    // Hardcoded clan data
    const clan = {
        logo: '/placeholder-logo.png',
        name: 'Klaanin nimi',
        ageRange: '18+',
        playerCount: 8,
        maxPlayers: 10,
        points: 1244,
        labels: ['lab', 'el', 'lab', 'el'],
    };

    return (
        <div className={styles.clanInfo}>
            <div className={styles.header}>
                <h2 className={styles.title}>{clan.name}</h2>
                <div className={styles.titleSection}>
                    <div className={styles.labels}>
                        {clan.labels.map((label, index) => (
                            <span
                                key={index}
                                className={styles.label}
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.contentSection}>
                <Image
                    src={clanLogo}
                    alt={'clan logo'}
                    className={styles.logo}
                />
                <div className={styles.footer}>
                    <span className={styles.members}>
                        Members {clan.playerCount}/{clan.maxPlayers}
                    </span>
                    <div className={styles.points}>
                        <span>{clan.points}</span>
                        <span className={styles.crown}>♛</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClanInfoTitle;
