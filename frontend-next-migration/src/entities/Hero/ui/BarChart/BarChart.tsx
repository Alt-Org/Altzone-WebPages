import cls from './BarChart.module.scss';
import { useClientTranslation } from '@/shared/i18n';
import { classNames } from '@/shared/lib/classNames/classNames';

export type Stat = {
    name: string;
    value: number;
    color: string;
};

export type BarChartProps = {
    stats: Stat[];
    width: number;
    height: number;
};
/**
 * This component is a bar chart for stats. The Stat object has the format {name: string, value: number, color: string} .
 *
 * To add a new stat, updates are required in `shared/i18n/locales/.../stats.json`
 *
 * @param props stats is an array of Stat objects. Width and height are the dimensions of the bar chart.
 * Color explanations add additional height to it.
 * @returns bar chart with transparent background (alpha 0.5)
 */
export const BarChart = (props: BarChartProps): JSX.Element => {
    const { stats = [], width, height } = props;
    const { t } = useClientTranslation('heroes-stats');

    const maxValue = stats.reduce((max, stat) => {
        if (stat.value > max) max = stat.value;
        return max;
    }, 0);

    const yValues = [];
    for (let i = maxValue; i > 0; --i) yValues.push(i);
    const fontSize = Math.min(Math.max((0.7 * height) / maxValue, 10), 24);

    const checkYVal = (value: number) => {
        //The highest value is always displayed
        if (value === maxValue)
            return (
                <div
                    data-testid="yMaxValue"
                    className={cls.number}
                >
                    {value}
                </div>
            );

        if (maxValue < 20) {
            return <div className={cls.number}>{value}</div>;
        } else {
            //If too many values are coming to the y-axis, only three are displayed
            if (value === Math.floor(maxValue / 2) || value === 1)
                return <div className={cls.number}>{value}</div>;
            else return <div />;
        }
    };

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
                            {checkYVal(value)}
                        </div>
                    ))}
                </div>
                <div
                    className={classNames(cls.yAxis, undefined, [cls.line])}
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
                    {stats.map((stat, key) => (
                        <div
                            key={key}
                            data-testid={stat.name}
                            className={cls.bar}
                            style={{
                                fontSize: `calc(${width / Object.keys(stats).length}px - ${(maxValue < 10 ? 1 : 1.5) / Object.keys(stats).length}em)`,
                                height: (height * stat.value) / maxValue,
                                backgroundColor: stat.color,
                            }}
                        >
                            <div className={cls.shadow}>
                                <div
                                    className={cls.highlight}
                                    style={{ backgroundColor: stat.color }}
                                />
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
                    {stats.map((stat, key) => (
                        <li
                            key={key}
                            style={{ color: stat.color }}
                        >
                            {t(stat.name)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
