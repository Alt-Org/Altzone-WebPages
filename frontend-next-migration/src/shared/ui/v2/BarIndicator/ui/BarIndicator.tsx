import cls from './BarIndicator.module.scss';
import hp from '@/shared/assets/icons/stats/hp.svg';
import resistance from '@/shared/assets/icons/stats/resistance.svg';
import size from '@/shared/assets/icons/stats/size.svg';
import speed from '@/shared/assets/icons/stats/speed.svg';
import strike from '@/shared/assets/icons/stats/strike.svg';
import Image from 'next/image';
import { useClientTranslation } from '@/shared/i18n';
import { classNames } from '@/shared/lib/classNames/classNames';

/**
 * Props for the BarIndicator component.
 */
interface BarIndicatorProps {
    /**
     * Value:
     * - number: fills that many bars with the primary color.
     * - string: disables all bars (no active bars are shown).
     */
    value: string | number;
    /**
     * Maximum number of enabled bars. Defaults to 24.
     * Effectively ignored when value is a string (all bars are disabled).
     */
    maxValue?: number;
    /**
     * Label/title of the stat.
     * With values "hp", "resistance", "size", "speed", and "strike", a corresponding stat symbol is rendered.
     */
    label?: string;
    /**
     * Optional "development threshold" text shown below the indicator.
     */
    developmentThreshold?: string;
}

/**
 * BarIndicator renders a row of bars visualizing a level and an optional label/icon.
 *
 * - For label values "hp", "resistance", "size", "speed", and "strike", a stat-specific symbol is displayed.
 * - If value is a string, all bars are disabled (no active bars).
 * - The component's width is 260px with the image and 212px without it.
 *
 * @param {Object} props Component props.
 * @param {number|string} props.value Number fills that many bars; string disables all bars.
 * @param {number} [props.maxValue=24] Maximum number of enabled bars; ignored when value is a string.
 * @param {string} [props.label] Stat label; specific values also render an icon ("hp", "resistance", "size", "speed", "strike").
 * @param {string} [props.developmentThreshold] Text for the development threshold shown below the indicator.
 * @returns {JSX.Element} The bar indicator JSX.
 *
 * @example
 * // 12 active bars, max 20; shows the speed icon
 * <BarIndicator label="speed" value={12} maxValue={20} developmentThreshold="Experienced" />
 *
 * @example
 * // String value disables all bars; shows the HP icon
 * <BarIndicator label="hp" value="-" />
 */

const BarIndicator = ({ value, maxValue = 24, label, developmentThreshold }: BarIndicatorProps) => {
    const { t } = useClientTranslation('barIndicator');
    const base: number[] = Array(24).fill(0);
    let icon;

    if (typeof value === 'string') {
        maxValue = 0;
    }

    if (label) {
        switch (label.toLowerCase()) {
            case 'hp':
                icon = hp;
                break;
            case 'resistance':
                icon = resistance;
                break;
            case 'size':
                icon = size;
                break;
            case 'speed':
                icon = speed;
                break;
            case 'strike':
                icon = strike;
        }
    }
    const Indicator = (
        <div className={cls.barIndicatorContainer}>
            {base.map((_, index) => {
                let variantClass = cls.barWhite;
                if (typeof value === 'number' && index < value) {
                    variantClass = cls.barPrimary;
                } else if (index < maxValue) {
                    variantClass = cls.barBlack;
                }
                return (
                    <div
                        key={index}
                        className={`${cls.bar} ${variantClass}`}
                    />
                );
            })}
        </div>
    );

    return (
        <div className={cls.BarIndicator}>
            {label ? (
                <div className={cls.LabelContainer}>
                    {icon && (
                        <Image
                            src={icon}
                            alt={'icon'}
                        />
                    )}
                    <div>
                        <p className={classNames(cls.Orange, undefined, [cls.label])}>
                            {t(label.toLowerCase())}
                        </p>
                        <p className={cls.level}>
                            {t('level')} <span className={cls.Orange}>{value}</span>
                        </p>
                        {Indicator}
                        {developmentThreshold && (
                            <p className={cls.threshold}>
                                {t('development-threshold')}{' '}
                                <span className={cls.Bold}>{developmentThreshold}</span>
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <p className={cls.level}>
                        {t('level')} {value}
                    </p>
                    {Indicator}
                </div>
            )}
        </div>
    );
};

export default BarIndicator;
