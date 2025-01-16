'use client';
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

const ClanInfoTitle = ({ name, ageRange, playerCount, points, labels }: ClanInfoTitleProps) => {

    return (
        // <div className={styles.clanInfo}>
        //     <div className={styles.header}>
        //         <h2 className={styles.title}>{name}</h2>
        //         <h2 className={styles.title}>{ageRange}</h2>

        //         <div className={styles.titleSection}>
        //             <Image src={clanLogo} alt={'clan logo'} className={styles.logo} />
        //             <div className={styles.labels}>
        //                 {labels.map((label, index) => (
        //                     <span key={index} className={styles.label}>
        //                         {label}
        //                     </span>
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        //     <div className={styles.contentSection}>
        //         <div className={styles.footer}>
        //             <span className={styles.members}>
        //                 Members {playerCount}/10
        //             </span>
        //             <div className={styles.point}>
        //                 <p>{points}</p>
        //                 <span className={styles.crown}>♛</span>
        //             </div>
        //         </div>
        //     </div>
        // </div>

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
                Members {playerCount}/10
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