import cls from './BarChart.module.scss';
import { useClientTranslation } from '@/shared/i18n';

export type Stats = {
    [key: string]: number;
};

export type BarChartProps = {
    stats: Stats;
    width: number;
    height: number;
};
/**
 * This component is a bar chart for stats: resistance, HP, size, impact force, and speed.
 *
 * To add a new stat, updates are required in `shared/i18n/locales/.../stats.json`
 * and in the SCSS file.
 * @param props The stats object contains key-value pairs. The key is the name of the stat,
 * and the value is its level as a numerical value. Width and height are the dimensions of the bar chart.
 * Color explanations add additional height to it.
 * @returns bar chart with transparent background (alpha 0.5)
 */
export const BarChart = (props: BarChartProps): JSX.Element => {
    const { stats, width, height } = props;
    const { t } = useClientTranslation('stats');

    const maxValue = Object.values(stats).reduce((max, value) => {
        if (value > max) max = value;
        return max;
    }, 0);

    const yValues = [];
    for (let i = maxValue; i > 0; --i) yValues.push(i);
    const fontSize = Math.min(Math.max((0.7 * height) / maxValue, 10), 24);

    return (
        <div
            className={cls.background}
            style={{
                fontSize: fontSize,
                padding: width / 8,
                // .number has margin-top -.27em
                paddingTop: width / 8 + 0.27 * fontSize,
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
                        height: height,
                    }}
                >
                    {yValues.map((value, key) => (
                        <div
                            key={key}
                            className={cls.numberContainer}
                            style={{ fontSize: height / maxValue }}
                        >
                            {
                                //This prevents displaying too many y-values and sets a test ID for testing purposes.
                                maxValue < 30 ? (
                                    value === maxValue ? (
                                        <div
                                            data-testid="yMaxValue"
                                            className={cls.number}
                                        >
                                            {value}
                                        </div>
                                    ) : (
                                        <div className={cls.number}>{value}</div>
                                    )
                                ) : value === maxValue ? (
                                    <div
                                        data-testid="yMaxValue"
                                        className={cls.number}
                                    >
                                        {value}
                                    </div>
                                ) : value === Math.floor(maxValue / 2) || value === 1 ? (
                                    <div className={cls.number}>{value}</div>
                                ) : (
                                    <div />
                                )
                            }
                        </div>
                    ))}
                </div>
                <div
                    className={cls.yAxis + ' ' + cls.line}
                    style={{
                        height: height,
                        width: '.5em',
                    }}
                >
                    {yValues.map((_value, key) => (
                        <div
                            key={key}
                            className={cls.stick}
                            style={{
                                height: height / maxValue,
                            }}
                        />
                    ))}
                </div>
                <div
                    className={cls.barChartContainer}
                    style={{
                        alignItems: 'baseline',
                    }}
                >
                    {Object.keys(stats).map((stat, key) => (
                        <div
                            key={key}
                            data-testid={stat}
                            className={cls[stat] + ' ' + cls.bar}
                            style={{
                                //Remove extra space to make the padding of the background element appear even. The y-axis elements need to be taken into account here.
                                fontSize: `calc(${width / Object.keys(stats).length}px - ${(maxValue < 10 ? 1 : 1.5) / Object.keys(stats).length}em)`,
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
                        columnCount: width < 200 ? 1 : width < 700 ? 2 : 3,
                    }}
                >
                    {Object.keys(stats).map((stat, key) => (
                        <li
                            key={key}
                            className={cls[stat] + ' ' + cls.text}
                        >
                            {t(stat)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
