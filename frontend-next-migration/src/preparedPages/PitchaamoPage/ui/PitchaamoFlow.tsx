// Miten Pitchaamo toimii

import demoIcon from '@/shared/assets/icons/pitchaamoDemo.svg';
import developmentIcon from '@/shared/assets/icons/pitchaamoDevelopment.svg';
import ideaIcon from '@/shared/assets/icons/pitchaamoIdea.svg';
import teamIcon from '@/shared/assets/icons/pitchaamoTeam.svg';
import { useTranslation } from '@/shared/i18n/settings/client';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import cls from './PitchaamoPage.module.scss';

const PitchaamoFlow = () => {
    const { t } = useTranslation('pitchaamo');
    return (
        <div className={cls.contentPanel}>
            <h2 className={cls.panelTitle}>{t('flow-title')}</h2>
            <div className={cls.flowSteps}>
                <div className={cls.flowStep}>
                    <Image
                        src={ideaIcon}
                        alt="lightbulb"
                        width={75}
                        height={95}
                    />
                    <div className={cls.stepTitle}>Idea</div>
                    <div className={cls.stepDescription}>{t('idea-description')}</div>
                </div>
                <FontAwesomeIcon
                    className={cls.flowArrow}
                    icon={faArrowRight}
                />
                <div className={cls.flowStep}>
                    <Image
                        src={teamIcon}
                        alt="people"
                        width={117}
                        height={75}
                    />
                    <div className={cls.stepTitle}>{t('team')}</div>
                    <div className={cls.stepDescription}>{t('team-description')}</div>
                </div>
                <FontAwesomeIcon
                    className={cls.flowArrow}
                    icon={faArrowRight}
                />
                <div className={cls.flowStep}>
                    <Image
                        src={developmentIcon}
                        alt="development"
                        width={85}
                        height={83}
                    />
                    <div className={cls.stepTitle}>{t('development')}</div>
                    <div className={cls.stepDescription}>{t('development-description')}</div>
                </div>
                <FontAwesomeIcon
                    className={cls.flowArrow}
                    icon={faArrowRight}
                />
                <div className={cls.flowStep}>
                    <Image
                        src={demoIcon}
                        alt="gamepad"
                        width={102}
                        height={75}
                    />
                    <div className={cls.stepTitle}>Demo</div>
                    <div className={cls.stepDescription}>{t('demo-description')}</div>
                </div>
            </div>
        </div>
    );
};

export default PitchaamoFlow;
