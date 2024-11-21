import cls from './BarChart.module.scss';
import { useClientTranslation } from '@/shared/i18n';

export type Stat = {
    name: string;
    value: number;
    color: string;
};

export type BarChartProps = {
    stats: Stat[];
};
/**
 * This component is a bar chart for stats. The Stat object has the format {name: string, value: number, color: string} .
 *
 * To add a new stat, updates are required in `shared/i18n/locales/.../heroes-stats.json`
 *
 * @param props stats is an array of Stat objects.
 * @returns bar chart
 */
export const BarChart = (props: BarChartProps): JSX.Element => {
    const { stats = [] } = props;
    const { t } = useClientTranslation('heroes-stats');
    const maxValue = Math.max(...stats.map((d) => d.value));
    const yTicks = 4;
    const tickValues = Array.from({ length: yTicks + 1 }, (_, i) =>
        Math.round((maxValue / yTicks) * i),
    );

    return (
        <div style={{ height: '100%' }}>
            <div className={cls.Barchart}>
                <div className={cls.yAxis}>
                    {tickValues.map((value, index) => (
                        <div
                            key={index}
                            className={cls.Number}
                        >
                            {value}
                        </div>
                    ))}
                </div>
                <div className={cls.Bars}>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={cls.BarContainer}
                            style={{
                                height: `${(stat.value / maxValue) * 100}%`,
                            }}
                        >
                            <div
                                key={index}
                                className={cls.Bar}
                                style={{
                                    background: stat.color || 'blue',
                                }}
                            >
                                <div className={cls.Shadow}>
                                    <div
                                        className={cls.Highlight}
                                        style={{
                                            background: stat.color || 'blue',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cls.Explanations}>
                <ul
                    style={{
                        columnCount: '2',
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
