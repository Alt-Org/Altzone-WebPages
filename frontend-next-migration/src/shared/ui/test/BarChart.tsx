import React from 'react';

interface DataPoint {
    value: number;
    color?: string;
}

interface ChartProps {
    data: DataPoint[];
    showYAxis?: boolean;
}

const BarChart: React.FC<ChartProps> = ({ data, showYAxis = true }) => {
    const maxValue = Math.max(...data.map((d) => d.value));
    const yTicks = 5;
    const tickValues = Array.from({ length: yTicks + 1 }, (_, i) =>
        Math.round((maxValue / yTicks) * i),
    );

    return (
        <div style={{ display: 'flex', height: '100%', width: '100%', position: 'relative' }}>
            {showYAxis && (
                <div
                    style={{
                        width: '50px',
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        justifyContent: 'space-between',
                        textAlign: 'right',
                        paddingRight: '5px',
                        borderRight: '1px solid #ccc',
                    }}
                >
                    {tickValues.map((value, index) => (
                        <div
                            key={index}
                            style={{ fontSize: '12px', color: '#555' }}
                        >
                            {value}
                        </div>
                    ))}
                </div>
            )}
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '5px' }}>
                {data.map((point, index) => (
                    <div
                        key={index}
                        style={{
                            flex: 1,
                            height: `${(point.value / maxValue) * 100}%`,
                            background: point.color || 'blue',
                            transition: 'height 0.3s ease',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default BarChart;
