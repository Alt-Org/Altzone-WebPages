import cls from './BarChart.module.scss';
import { useClientTranslation } from '@/shared/i18n';

export type Stats = {
    resistance: number;
    hp: number;
    size: number;
    impactForce: number;
    speed: number;
};

export type BarChartProps = {
    stats: Stats;
    width: number;
    height: number;
};

export const BarChart = (props: BarChartProps): JSX.Element => {
    const { stats, width, height } = props;
    const { t } = useClientTranslation('stats');

    const maxValue = Object.values(stats).reduce((max, value) => {
        if (value > max) max = value;
        return max;
    }, 0);

    const yValues = [];
    for (let i = maxValue; i > 0; --i) yValues.push(i);

    return (
        <div
            className={cls.background}
            style={{
                fontSize: height / maxValue,
                borderRadius: width / 15,
            }}
        >
            <div
                className={cls.barChartContainer}
                style={{
                    width: width,
                }}
            >
                <div
                    className={cls.yAxis}
                    style={{
                        width: ((width / (Object.keys(stats).length + 0.5)) * 1) / 3,
                        height: height,
                    }}
                >
                    {yValues.map((value, key) => (
                        <div
                            key={key}
                            className={cls.numberContainer}
                        >
                            <div className={cls.number}>{value}</div>
                        </div>
                    ))}
                </div>
                <div
                    className={cls.yAxis + ' ' + cls.line}
                    style={{
                        width: ((width / (Object.keys(stats).length + 0.5)) * 1) / 6,
                        height: height,
                        borderWidth: (height * width) / 30000,
                    }}
                >
                    {yValues.map((_value, key) => (
                        <div
                            key={key}
                            className={cls.stick}
                            style={{
                                height: height / maxValue,
                                borderWidth: (height * width) / 30000,
                            }}
                        />
                    ))}
                </div>
                <div
                    className={cls.barChartContainer}
                    style={{
                        alignItems: 'baseline',
                        width: width * (1 - ((1 / (Object.keys(stats).length + 0.5)) * 1) / 2),
                    }}
                >
                    {Object.keys(stats).map((stat, key) => (
                        <div
                            key={key}
                            className={cls[stat] + ' ' + cls.bar}
                            style={{
                                fontSize: width / (Object.keys(stats).length + 0.5),
                                // @ts-ignore
                                height: (height * stats[stat]) / maxValue,
                            }}
                        >
                            <div className={cls.shadow}>
                                <div className={cls[stat] + ' ' + cls.highlight} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div
                className={cls.description}
                style={{
                    width: width,
                    fontSize: Math.max(Math.min(width / 20, 24), 10),
                }}
            >
                <ul
                    className={cls.descriptionBlock}
                    style={{
                        marginLeft: width / 8,
                        columnCount: `${width < 200 ? 1 : 2}`,
                    }}
                >
                    {
                        // @ts-ignore
                        Object.keys(stats).map((stat, key) => (
                            <li
                                key={key}
                                className={cls[stat] + ' ' + cls.text}
                            >
                                {t(stat)}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};
